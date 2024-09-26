import { Box, Stack } from "@chakra-ui/react";
import Head from "next/head";
/* Components */
import Hero from "../components/Hero";
import NextShow from "../components/NextShow";
import Reviews from "../components/Reviews";
import AlbumCard from "../components/UI/AlbumCard";
import Section from "../components/UI/Section";
import Video from "../components/Video";
import sanityClient from "../lib/sanityClient";

export default function Home(props) {
  const { hero, albums } = props;
  // Note: Album for Hero
  const heroAlbum = albums.find(
    (album) => album._id === hero.albumReference._ref
  );

  return (
    <div>
      <Head>
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> */}
        <link
          href="https://fonts.googleapis.com/css2?family=Alex+Brush&display=swap"
          rel="stylesheet"
        />
      </Head>
      {/* Hero image */}
      <Hero heroImage={hero.heroImage} album={heroAlbum} her />
      {/* Other albums */}
      <Section
        bg="brown"
        px={["2rem", "2rem", "3rem", "6.2rem"]}
        py="2rem"
        title="Albums"
      >
        <Box>
          <Stack
            direction={["column", "column", "row"]}
            spacing={["15%", "5%", "2%", "3%"]}
            align="center"
          >
            {props.albums.map((album) => (
              <AlbumCard
                key={album._id}
                slug={album.albumSlug.current}
                year={album.albumDate.split("-")[0]}
                image={album.albumImage}
                title={album.albumTitle}
              />
            ))}
          </Stack>
        </Box>
      </Section>

      {/* Video */}
      <Section bg="yellow" title="Videos" py="2rem">
        <Video />
      </Section>

      {/*  Next Show */}
      <Section bg="brown" title="Next Show" py="2rem">
        <NextShow shows={props.shows} />
      </Section>

      {/* Review */}
      <Section bg="yellow" pt="2rem" pb="5rem" title="Reviews">
        <Box align="center">
          <Reviews reviews={props.review} />
        </Box>
      </Section>
    </div>
  );
}

export async function getStaticProps() {
  const shows = await sanityClient.fetch(`
*[_type == "show"]
`);

  const review = await sanityClient.fetch(`
*[_type == "review"]
`);

  const albums = await sanityClient.fetch(`
*[_type == "album"]
`);

  const hero = await sanityClient.fetch(`
  *[_type == "hero"][0]{
    _id,
    title,
    heroImage,
    albumReference
  }
`);

  return {
    props: {
      shows,
      review,
      albums,
      hero,
    },
    revalidate: 60,
  };
}
