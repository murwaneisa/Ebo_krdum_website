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
 */
const CARD_W = { base: "78vw", sm: "244px", md: "268px", lg: "300px" };
const CARD_SIZES =
  "(max-width: 479px) 78vw, (max-width: 767px) 244px, (max-width: 1023px) 268px, 300px";

function AlbumCard({ album }) {
  const src = coverUrl(album, 600);
  console.log("AlbumCard src", src, "album", album);

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
                fontSize={{ base: "13px", md: "15px" }}
                fontWeight="700"
                px={{ base: "10px", md: "12px" }}
                py="6px"
              >
                {album.year}
              </Box>
            </Box>

            <Flex align="baseline" gap="10px" mt="16px">
              <Box
                as="span"
                fontFamily="display"
                fontSize="13px"
                color="bronze"
              >
                {album.num}
              </Box>
              <Box
                as="span"
                fontFamily="display"
                fontSize={{ base: "19px", md: "22px", lg: "24px" }}
                fontWeight="500"
                css={{ textWrap: "balance" }}
              >
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
    </Box>
  );
}

export default function AlbumShelf({ albums = [] }) {
  if (!albums.length) return null;

  return (
    <Box as="section" id="albums" maxW="shell" mx="auto" pt="96px">
      <Flex
        px="gutter"
        align="flex-end"
        justify="space-between"
        gap="32px"
        wrap="wrap"
      >
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
        mt={{ base: "28px", md: "44px" }}
        gap={{ base: "16px", md: "22px", lg: "28px" }}
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
