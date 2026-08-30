import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import Eyebrow from "../common/Eyebrow";
import MetaItem from "../common/MetaItem";
import AlbumPlayer from "./AlbumPlayer";

export default function FeaturedAlbum({ album }) {
  if (!album) return null;

  return (
    <Grid
      maxW="shell"
      mx="auto"
      py="clamp(3.25rem,7vw,5.5rem)"
      px="gutter"
      templateColumns="repeat(auto-fit,minmax(20.625rem,1fr))"
      gap="clamp(2.25rem,4vw,4rem)"
      alignItems="center"
    >
      <Box>
        <Eyebrow tone="amber">01 — Featured album</Eyebrow>
        <Heading
          as="h2"
          textStyle="sectionLg"
          lineHeight="0.98"
          m="0"
          color="cream"
        >
          {album.title}
        </Heading>
        <Flex gap="11" mt="9" wrap="wrap">
          <MetaItem label="Genre" value={album.genre || "Desert blues"} />
          <MetaItem label="Released" value={album.year} />
          {album.trackCount ? (
            <MetaItem label="Tracks" value={String(album.trackCount)} />
          ) : null}
        </Flex>
      </Box>

      <AlbumPlayer
        deezerAlbumId={album.deezerAlbumId}
        title={album.title}
        height={440}
      />
    </Grid>
  );
}
