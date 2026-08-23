import NextLink from "next/link";
import { Box, Flex, Link } from "@chakra-ui/react";
import Eyebrow from "../common/Eyebrow";
import SectionHeading from "../common/SectionHeading";
import FilmStrip from "../common/FilmStrip";
import { coverUrl } from "@/lib/albums";

function AlbumCard({ album }) {
  const src = coverUrl(album, 700);

  return (
    <Link
      asChild
      flex="0 0 min(300px,72vw)"
      color="cream"
      css={{ scrollSnapAlign: "start" }}
      _hover={{ color: "amberBright" }}
    >
      <NextLink href={`/album/${album.slug}`}>
        <Box>
          <Box
            position="relative"
            overflow="hidden"
            border="1px solid"
            borderColor="rgba(139,90,43,0.45)"
          >
            <Box
              role="img"
              aria-label={`${album.title} album cover`}
              display="block"
              w="100%"
              bg="surface"
              css={{
                aspectRatio: "1",
                backgroundImage: src ? `url(${src})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Box
              position="absolute"
              left="0"
              bottom="0"
              bg="amber"
              color="ink"
              fontFamily="display"
              fontSize="15px"
              fontWeight="700"
              px="12px"
              py="6px"
            >
              {album.year}
            </Box>
          </Box>
          <Flex align="baseline" gap="10px" mt="16px">
            <Box as="span" fontFamily="display" fontSize="13px" color="bronze">
              {album.num}
            </Box>
            <Box as="span" fontFamily="display" fontSize="24px" fontWeight="500">
              {album.title}
            </Box>
          </Flex>
          {album.recordType && album.recordType !== "album" && (
            <Box
              mt="6px"
              ml="30px"
              fontSize="11px"
              letterSpacing="0.2em"
              textTransform="uppercase"
              color="bronze"
            >
              {album.recordType}
            </Box>
          )}
        </Box>
      </NextLink>
    </Link>
  );
}

export default function AlbumShelf({ albums = [] }) {
  if (!albums.length) return null;

  return (
    <Box as="section" id="albums" maxW="shell" mx="auto" pt="96px">
      <Flex px="gutter" align="flex-end" justify="space-between" gap="32px" wrap="wrap">
        <Box>
          <Eyebrow>02 — Discography</Eyebrow>
          <SectionHeading>
            {albums.length} release{albums.length === 1 ? "" : "s"}
          </SectionHeading>
        </Box>
        <Box
          fontSize="13px"
          letterSpacing="0.1em"
          textTransform="uppercase"
          color="rgba(247,239,221,0.5)"
          pb="8px"
        >
          Scroll →
        </Box>
      </Flex>

      <Flex
        data-shelf="true"
        mt="44px"
        gap="28px"
        overflowX="auto"
        px="gutter"
        pb="26px"
        css={{ scrollSnapType: "x mandatory" }}
      >
        {albums.map((album) => (
          <AlbumCard key={album.slug} album={album} />
        ))}
      </Flex>

      <Box px="gutter">
        <FilmStrip />
      </Box>
    </Box>
  );
}
