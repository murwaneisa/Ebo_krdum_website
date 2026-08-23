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

export default function Hero({ image, alt, dim = 0.38, topLight = 0.3, focus = 34 }) {
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
        pt="clamp(80px,14vh,150px)"
        px="gutter"
        pb="clamp(40px,6vw,64px)"
      >
        <Box maxW="min(760px,100%)">
          <Box
            fontSize="12px"
            letterSpacing="0.34em"
            textTransform="uppercase"
            color="amber"
            mb="24px"
          >
            Desert blues from Swedish soil
          </Box>
          <Heading
            as="h1"
            fontFamily="display"
            fontWeight="600"
            fontSize="clamp(52px,9vw,138px)"
            lineHeight="0.86"
            letterSpacing="-0.02em"
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
            mt="30px"
            fontSize="clamp(17px,1.5vw,20px)"
            lineHeight="1.6"
            color="rgba(247,239,221,0.86)"
            css={{ textWrap: "pretty" }}
          >
            Swedish Grammis award winner, Sudanese-Swedish troubadour — from
            Darfur to the biggest breakthrough.
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
