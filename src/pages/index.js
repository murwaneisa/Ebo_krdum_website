import { withSiteLayout } from "@/components/layout/SiteLayout";
import Hero from "@/components/home/Hero";
import FeaturedAlbum from "@/components/home/FeaturedAlbum";
import AlbumShelf from "@/components/home/AlbumShelf";
import ListenSection from "@/components/home/ListenSection";
import NextShow from "@/components/home/NextShow";
import PressStrip from "@/components/home/PressStrip";
import { cmsFetch, imageUrl } from "@/lib/cms";
import { getArtistAlbums } from "@/lib/spotify";
import { FEATURED_SLUG, mergeWithSpotify } from "@/lib/albums";
import { SPOTIFY_ARTIST_ID } from "@/data/site";
import { REVIEWS } from "@/data/reviews";

export default function Home({ heroImage, heroAlt, albums, featured, shows, reviews }) {
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
    null
  );

  const shows = await cmsFetch(
    `*[_type == "show"]{ _id, showTitle, showDate, showCity, showCountry, showBookingLink }`,
    {},
    []
  );

  // Spotify supplies album ids and release years; lib/albums.js keeps slugs and
  // cover art, and is the whole answer when Spotify is unavailable.
  const spotifyAlbums = await getArtistAlbums(SPOTIFY_ARTIST_ID);
  const albums = mergeWithSpotify(spotifyAlbums);
  const featured = albums.find((a) => a.slug === FEATURED_SLUG) || albums[0] || null;

  return {
    props: {
      heroImage: hero?.heroImage ? imageUrl(hero.heroImage, 1900, 82) : null,
      heroAlt: hero?.title || "Ebo Krdum",
      albums,
      featured,
      shows: shows || [],
      reviews: REVIEWS,
    },
    revalidate: 60 * 30,
  };
}
