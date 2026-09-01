import Image from "next/image";
import { Box, Heading, Text } from "@chakra-ui/react";

/*
 * Full-bleed hero. Two scrims sit over the photo:
 *  - scrimX darkens left-to-right so the headline stays legible
 *  - scrimY fades the base into the page background
 * The `dim` / `topLight` / `focus` knobs mirror the adjustable props in the
 * Claude Design artboard, with its defaults baked in here.
 */
const ink = (a) => `rgba(36,26,16,${Math.min(0.97, a).toFixed(3)})`;

/*
 * The wording the site shipped with. `tagline` and `description` are editable
 * in Sanity but optional, so these stand in whenever the CMS has nothing —
 * checked with `||` rather than a default parameter, which would not catch the
 * null a missing field resolves to.
 *
 * The name itself is not editable: it is the artist's name, and it never
 * changes.
 */
const DEFAULT_TAGLINE = "African blues and roots music";
// Written across three lines to match the three-row field in Sanity: the
// rendered text keeps the author's line breaks, so the fallback has to break in
// the same places or it would set differently from a CMS-supplied one.
const DEFAULT_DESCRIPTION =
  "Swedish Grammis award winner,\nSudanese-Swedish troubadour\nfrom Darfur to the biggest breakthrough.";

export default function Hero({
  image,
  alt,
  tagline,
  description,
  dim = 0.38,
  topLight = 0.3,
  focus = 34,
}) {
  const scrimX = {
    background: `linear-gradient(90deg,${ink(dim * 1.71)} 0%,${ink(dim * 1.31)} 34%,${ink(dim * 0.33)} 62%,${ink(dim)} 100%)`,
    maskImage: `linear-gradient(180deg, rgba(0,0,0,${(1 - topLight).toFixed(2)}) 0%, #000 58%)`,
    WebkitMaskImage: `linear-gradient(180deg, rgba(0,0,0,${(1 - topLight).toFixed(2)}) 0%, #000 58%)`,
  };

  const scrimY = {
    background: `linear-gradient(0deg,#241A10 0%,#241A10 3%,${ink(dim * 0.64)} 26%,rgba(36,26,16,0) 55%)`,
  };

  return (
    <Box
      as="section"
      id="top"
      position="relative"
      minH="min(88vh,880px)"
      display="flex"
      alignItems="flex-end"
      overflow="hidden"
      bg="ink"
    >
      {image && (
        <Image
          src={image}
          alt={alt || "Ebo Krdum"}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: `50% ${focus}%` }}
        />
      )}
      <Box position="absolute" inset="0" css={scrimX} />
      <Box position="absolute" inset="0" css={scrimY} />

      <Box
        position="relative"
        w="100%"
        maxW="shell"
        mx="auto"
        pt="clamp(5rem,14vh,9.375rem)"
        px="gutter"
        pb="clamp(2.5rem,6vw,4rem)"
      >
        <Box maxW="min(47.5rem,100%)">
          <Box
            textStyle="microLabel"
            letterSpacing="0.34em"
            color="amber"
            mb="6"
          >
            {tagline || DEFAULT_TAGLINE}
          </Box>
          <Heading
            as="h1"
            textStyle="hero"
            m="0"
            color="cream"
            css={{ textWrap: "balance" }}
          >
            Ebo
            <br />
            <Box as="span" fontStyle="italic" color="amberBright">
              Krdum
            </Box>
          </Heading>
          <Text
            maxW="40ch"
            mt="8"
            textStyle="lead"
            color="rgba(247,239,221,0.86)"
            /*
             * The Sanity field is a three-row `text`, so the artist's own line
             * breaks are part of the wording. `pre-line` keeps them while still
             * collapsing stray spaces and wrapping anything past `maxW`.
             */
            whiteSpace="pre-line"
            css={{ textWrap: "pretty" }}
          >
            {description || DEFAULT_DESCRIPTION}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
