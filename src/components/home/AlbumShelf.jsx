import NextLink from "next/link";
import Image from "next/image";
import { Box, Flex, Link } from "@chakra-ui/react";
import Eyebrow from "../common/Eyebrow";
import SectionHeading from "../common/SectionHeading";
import FilmStrip from "../common/FilmStrip";
import { coverUrl } from "@/lib/albums";

/*
 * Horizontal, scroll-snapping shelf of every release.
 *
 * Two things here are deliberate and easy to undo by accident:
 *
 * 1. The cover is a next/image, not a CSS background. A `bg` style prop
 *    compiles to the `background` SHORTHAND and Chakra emits it after the `css`
 *    prop, so `bg="surface"` alongside css.backgroundImage silently reset the
 *    image to none and every cover rendered as an empty panel. Any placeholder
 *    colour here must use bgColor (the longhand), never bg.
 *
 * 2. Card width is a plain responsive `w`, not a `flex` shorthand. Putting a
 *    min() inside `flex: 0 0 min(300px,72vw)` makes the whole declaration fail
 *    to parse in some browsers, which drops it entirely and leaves cards sized
 *    by their title text.
 */

/*
 * Card width per breakpoint, mirrored in the next/image `sizes` hint so the
 * browser picks a sensibly sized file. The pixel values in `sizes` are Chakra's
 * own breakpoints minus 1: sm 30rem/480, md 48rem/768, lg 64rem/1024. Keep the
 * two in step if either changes.
 *
 * CARD_W is rem so a card grows with the reader's font size instead of clipping
 * its title. `sizes` stays px: it is only a hint to the preload scanner, and at
 * a non-default root size the worst case is a marginally different file.
 */
const CARD_W = { base: "78vw", sm: "15.25rem", md: "16.75rem", lg: "18.75rem" };
const CARD_SIZES =
  "(max-width: 479px) 78vw, (max-width: 767px) 244px, (max-width: 1023px) 268px, 300px";

function AlbumCard({ album }) {
  const src = coverUrl(album, 600);

  return (
    <Box flexShrink="0" w={CARD_W} css={{ scrollSnapAlign: "start" }}>
      <Link
        asChild
        display="block"
        color="cream"
        _hover={{ color: "amberBright" }}
      >
        <NextLink href={`/album/${album.slug}`}>
          <Box>
            <Box
              position="relative"
              w="100%"
              overflow="hidden"
              border="1px solid"
              borderColor="rgba(139,90,43,0.45)"
              bgColor="surface"
              css={{ aspectRatio: "1" }}
            >
              {src && (
                <Image
                  src={src}
                  alt={`${album.title} album cover`}
                  fill
                  sizes={CARD_SIZES}
                  style={{ objectFit: "cover" }}
                />
              )}
              <Box
                position="absolute"
                left="0"
                bottom="0"
                bgColor="amber"
                color="ink"
                fontFamily="display"
                fontSize="sm"
                fontWeight="700"
                px={{ base: "2.5", md: "3" }}
                py="1.5"
              >
                {album.year}
              </Box>
            </Box>

            <Flex align="baseline" gap="2.5" mt="4">
              <Box
                as="span"
                fontFamily="display"
                fontSize="sm"
                color="bronze"
              >
                {album.num}
              </Box>
              <Box
                as="span"
                fontFamily="display"
                fontSize="xl"
                fontWeight="500"
                css={{ textWrap: "balance" }}
              >
                {album.title}
              </Box>
            </Flex>

            {album.recordType && album.recordType !== "album" && (
              <Box
                mt="1.5"
                ml="8"
                textStyle="microLabel"
                color="bronze"
              >
                {album.recordType}
              </Box>
            )}
          </Box>
        </NextLink>
      </Link>
    </Box>
  );
}

export default function AlbumShelf({ albums = [] }) {
  if (!albums.length) return null;

  return (
    <Box as="section" id="albums" maxW="shell" mx="auto" pt="24">
      <Flex
        px="gutter"
        align="flex-end"
        justify="space-between"
        gap="8"
        wrap="wrap"
      >
        <Box>
          <Eyebrow>02 — Discography</Eyebrow>
          <SectionHeading>
            {albums.length} release{albums.length === 1 ? "" : "s"}
          </SectionHeading>
        </Box>
        <Box
          textStyle="eyebrow"
          letterSpacing="0.1em"
          color="rgba(247,239,221,0.5)"
          pb="2"
        >
          Scroll →
        </Box>
      </Flex>

      <Flex
        data-shelf="true"
        mt={{ base: "7", md: "11" }}
        gap={{ base: "4", md: "6", lg: "7" }}
        overflowX="auto"
        px="gutter"
        pb="7"
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
