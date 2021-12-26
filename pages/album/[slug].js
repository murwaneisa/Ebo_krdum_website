import { Box, Text } from "@chakra-ui/react";
import AlbumInfoSection from "../../components/album/AlbumInfoSection";
import SongsListSection from "../../components/album/SongsListSection";
import Section from "../../components/UI/Section";
import sanityClient from "../../lib/sanityClient";

const AlbumItems = (props) => {
  // get album
  const { album } = props;

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
  const { _ref: ref } = albumImage.itemImage.asset;
  const assetRefParts = ref.split("-"); // ["file", "ff7...", "m4a"]
  const id = assetRefParts[1]; // "ff7..."
  const size = assetRefParts[2]; // 1400 x 1400
  const format = assetRefParts[3]; // "jpg"
  const imageUrl = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}-${size}.${format}`;

  const albumYear = albumDate;

  return (
    <Box>
      {/* album info section */}
      {/* Want to pass in data via props: album title, description, year, spotify link for all album */}
      <AlbumInfoSection
        title={albumTitle}
        description={albumDescription}
        year={albumYear}
        image={imageUrl}
        photographer={albumImage.photoTakenBy}
        albumSpotify={albumSpotifyLink}
      />

      {/* Album Songs section */}
      {/* Pass through album songs as props */}
      <SongsListSection songs={albumSong} />
    </Box>
  );
};

export async function getStaticPaths() {
  let res = await sanityClient.fetch(
    `*[_type == "albums" && defined(albumSlug.current)][].albumSlug.current`
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
    *[_type == "albums" && albumSlug.current == $slug][0]
  `,
    { slug }
  );

  console.log("album in getStaticProps: ", album);

  return {
    props: {
      album,
    },
  };
}

export default AlbumItems;
