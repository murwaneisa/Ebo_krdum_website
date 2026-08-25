import { withSiteLayout } from "@/components/layout/SiteLayout";
import Hero from "@/components/home/Hero";
import FeaturedAlbum from "@/components/home/FeaturedAlbum";
import AlbumShelf from "@/components/home/AlbumShelf";
import ListenSection from "@/components/home/ListenSection";
import NextShow from "@/components/home/NextShow";
import PressStrip from "@/components/home/PressStrip";
import { cmsFetch, imageUrl } from "@/lib/cms";
import { getAlbum, getArtistAlbums } from "@/lib/deezer";
import { buildDiscography, genreOf, pickFeatured } from "@/lib/albums";
import { DEEZER_ARTIST_ID } from "@/data/site";
import { getReviews } from "@/lib/reviews";

export default function Home({
  heroImage,
  heroAlt,
  albums,
  featured,
  shows,
  reviews,
}) {
  return (
    <>
      <Hero image={heroImage} alt={heroAlt} />
      <FeaturedAlbum album={featured} />
      <AlbumShelf albums={albums} />
      <ListenSection />
      <NextShow shows={shows} />
      <PressStrip reviews={reviews} />
    </>
  );
}

Home.getLayout = withSiteLayout();

export async function getStaticProps() {
  const hero = await cmsFetch(
    `*[_type == "hero"][0]{ _id, title, heroImage }`,
    {},
    null,
  );

  const shows = await cmsFetch(
    `*[_type == "show"]{ _id, showTitle, showDate, showCity, showCountry, showBookingLink }`,
    {},
    [],
  );

  // Deezer is the source of truth for the discography — no CMS entry needed for
  // a new release. If it is unreachable, buildDiscography returns the local
  // fallback so the page still renders.
  const albums = buildDiscography(await getArtistAlbums(DEEZER_ARTIST_ID));
  console.log("Home.getStaticProps albums", albums);
  const featured = pickFeatured(albums);

  // The artist listing omits nb_tracks and genres, so the featured release is
  // fetched in full to fill in its meta row. Reviews are independent, so both
  // go out together.
  const [featuredDetail, reviews] = await Promise.all([
    featured ? getAlbum(featured.deezerAlbumId) : null,
    // Four most recently added reviews; /press shows the full set.
    getReviews({ limit: 4 }),
  ]);

  return {
    props: {
      heroImage: hero?.heroImage ? imageUrl(hero.heroImage, 1900, 82) : null,
      heroAlt: hero?.title || "Ebo Krdum",
      albums,
      featured: featured
        ? {
            ...featured,
            trackCount: featuredDetail?.nb_tracks ?? featured.trackCount,
            genre: genreOf(featuredDetail),
          }
        : null,
      shows: shows || [],
      reviews,
    },
    revalidate: 60 * 60, // refresh the discography hourly
  };
}
