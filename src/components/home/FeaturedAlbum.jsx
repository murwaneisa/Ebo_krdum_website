import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import Eyebrow from "../common/Eyebrow";
import MetaItem from "../common/MetaItem";
import AlbumPlayer from "./AlbumPlayer";

export default function FeaturedAlbum({ album, description }) {
  if (!album) return null;

  return (
    <Grid
      maxW="shell"
      mx="auto"
      py="clamp(52px,7vw,88px)"
      px="gutter"
      templateColumns="repeat(auto-fit,minmax(330px,1fr))"
      gap="clamp(36px,4vw,64px)"
      alignItems="center"
    >
      <Box>
        <Eyebrow tone="amber">04 — Featured album</Eyebrow>
        <Heading
          as="h2"
          fontFamily="display"
          fontSize="clamp(38px,4.6vw,64px)"
          lineHeight="0.98"
          fontWeight="500"
          m="0"
          color="cream"
        >
          {album.title}{" "}
          <Box
            as="span"
            fontStyle="italic"
            color="amber"
            fontSize="0.6em"
            whiteSpace="nowrap"
          >
            {album.year}
          </Box>
        </Heading>
        {description && (
          <Text
            mt="24px"
            fontSize="17px"
            lineHeight="1.7"
            color="rgba(247,239,221,0.72)"
            maxW="46ch"
          >
            {description}
          </Text>
        )}
        <Flex gap="44px" mt="36px" wrap="wrap">
          <MetaItem label="Genre" value={album.genre || "Desert blues"} />
          <MetaItem label="Released" value={album.year} />
          {album.trackCount ? (
            <MetaItem label="Tracks" value={String(album.trackCount)} />
          ) : null}
        </Flex>
      </Box>

      <AlbumPlayer
        spotifyAlbumId={album.spotifyAlbumId}
        deezerAlbumId={album.deezerAlbumId}
        title={album.title}
        height={440}
      />
    </Grid>
  );
}
