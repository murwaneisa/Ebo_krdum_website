import { useState } from "react";
import { Box, Flex, Grid, Link, Text } from "@chakra-ui/react";
import Eyebrow from "../common/Eyebrow";
import SectionHeading from "../common/SectionHeading";
import FilmStrip from "../common/FilmStrip";
import ReviewLogo from "../common/ReviewLogo";
import { isFallback, textFor } from "@/lib/reviews";

function LangButton({ active, children, onClick }) {
  return (
    <Box
      as="button"
      type="button"
      onClick={onClick}
      aria-pressed={active}
      fontFamily="body"
      fontSize="12px"
      letterSpacing="0.14em"
      textTransform="uppercase"
      fontWeight="600"
      px="20px"
      py="12px"
      border="none"
      cursor="pointer"
      bg={active ? "amber" : "transparent"}
      color={active ? "ink" : "rgba(247,239,221,0.7)"}
      _hover={{ color: active ? "ink" : "amberBright" }}
    >
      {children}
    </Box>
  );
}

export default function PressStrip({ reviews = [] }) {
  const [lang, setLang] = useState("en");
  if (!reviews.length) return null;

  return (
    <Box as="section" id="press" maxW="shell" mx="auto" pt="clamp(56px,8vw,96px)" px="gutter">
      <Flex align="flex-end" justify="space-between" gap="32px" wrap="wrap">
        <Box>
          <Eyebrow>05 — Press</Eyebrow>
          <SectionHeading>What the critics wrote</SectionHeading>
        </Box>
        <Flex border="1px solid" borderColor="bronze" borderRadius="2px" overflow="hidden">
          <LangButton active={lang === "en"} onClick={() => setLang("en")}>
            English
          </LangButton>
          <LangButton active={lang === "sv"} onClick={() => setLang("sv")}>
            Svenska
          </LangButton>
        </Flex>
      </Flex>

      {/* 1px gap over a bronze background paints the hairline grid rules */}
      <Grid
        mt="44px"
        templateColumns="repeat(auto-fit,minmax(300px,1fr))"
        gap="1px"
        bg="rgba(139,90,43,0.45)"
        border="1px solid"
        borderColor="rgba(139,90,43,0.45)"
      >
        {reviews.map((r) => (
          <Link
            key={r.id}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            bg="ink"
            pt="36px"
            px="32px"
            pb="30px"
            display="flex"
            flexDirection="column"
            gap="20px"
            color="cream"
            _hover={{ bg: "surface", color: "cream" }}
          >
            {r.logo ? (
              <ReviewLogo logo={r.logo} alt={r.outlet} height={24} />
            ) : (
              <FilmStrip size={12} w="72px" />
            )}
            <Text
              fontFamily="display"
              fontSize="19px"
              lineHeight="1.5"
              m="0"
              color="rgba(247,239,221,0.92)"
              css={{ textWrap: "pretty" }}
            >
              {textFor(r, lang)}
            </Text>
            <Box
              mt="auto"
              fontSize="12px"
              letterSpacing="0.2em"
              textTransform="uppercase"
              color="amber"
            >
              {r.outlet}
              {isFallback(r, lang) && (
                <Box as="span" color="bronze" textTransform="none" letterSpacing="0" ml="8px">
                  (in {lang === "sv" ? "English" : "Swedish"})
                </Box>
              )}
            </Box>
          </Link>
        ))}
      </Grid>

      <FilmStrip mt="88px" />
    </Box>
  );
}
