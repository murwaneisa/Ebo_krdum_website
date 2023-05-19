import { Box, Text } from "@chakra-ui/react";
import AlbumInfoSection from "../../components/album/AlbumInfoSection";
import SongsListSection from "../../components/album/SongsListSection";
import Section from "../../components/UI/Section";
import { imageCDN } from "../../lib/imageCdnFn";
import sanityClient from "../../lib/sanityClient";

const AlbumItems = (props) => {
  // get album
  const { album } = props;
  console.log("the album is", album);

  if (!album) {
    return (
      <Section bg="brown">
        <Box pb="100%" pt="100%" justify="Center" align="center">
          <Text>No Album with the Requested URL</Text>
        </Box>
      </Section>
    );
  }

  const {
    albumTitle,
    albumDescription,
    albumDate,
    albumImage,
    albumSpotifyLink,
    albumSong,
  } = album;

  // Get image url from Sanity
  const imageFromSanity = imageCDN(albumImage.itemImage);

  // Get year only from date. albumDate is string 2020-10-23
  const albumYear = albumDate.split("-")[0];

  return (
    <Box>
      {/* album info section */}
      {/* Want to pass in data via props: album title, description, year, spotify link for all album */}
      <AlbumInfoSection
        title={albumTitle}
        description={albumDescription}
        year={albumYear}
        image={imageFromSanity}
        photographer={albumImage.photoTakenBy}
        albumSpotify={albumSpotifyLink}
      />

      {/* Album Songs section */}
      {/* Pass through album songs as props */}
      {albumSong ? <SongsListSection songs={albumSong} /> : null}
    </Box>
  );
};

export async function getStaticPaths() {
  let res = await sanityClient.fetch(
    `*[_type == "album" && defined(albumSlug.current)][].albumSlug.current`
  );
  const paths = res.map((slug) => ({ params: { slug: slug } }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params;

  const album = await sanityClient.fetch(
    `
    *[_type == "album" && albumSlug.current == $slug][0]
  `,
    { slug }
  );

  return {
    props: {
      album,
    },
    revalidate: 24 * 60 * 60,
  };
}

export default AlbumItems;
