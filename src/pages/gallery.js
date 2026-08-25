import { useMemo, useState } from "react";
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { withSiteLayout } from "@/components/layout/SiteLayout";
import FilmStrip from "@/components/common/FilmStrip";
import Lightbox from "@/components/common/Lightbox";
import { CONTACT } from "@/data/site";
import { GALLERY_CATEGORIES, GALLERY_PHOTOS } from "@/data/photos";

function FilterButton({ active, children, onClick }) {
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
      px="22px"
      py="12px"
      cursor="pointer"
      borderRadius="2px"
      border="1px solid"
      borderColor={active ? "amber" : "rgba(139,90,43,0.6)"}
      bg={active ? "amber" : "transparent"}
      color={active ? "ink" : "rgba(247,239,221,0.72)"}
    >
      {children}
    </Box>
  );
}

export default function Gallery() {
  const [cat, setCat] = useState("All");
  const [active, setActive] = useState(null);

  // The lightbox steps through the *filtered* set, so Next/Prev never jumps to a
  // photo that is hidden behind the current filter.
  const visible = useMemo(
    () => GALLERY_PHOTOS.filter((p) => cat === "All" || p.cat === cat),
    [cat]
  );

  const selectCat = (key) => {
    setCat(key);
    setActive(null);
  };

  return (
    <>
      <Box as="section" maxW="shell" mx="auto" pt="clamp(52px,7vw,88px)" px="gutter">
        <Flex wrap="wrap" align="flex-end" gap="28px clamp(24px,3vw,48px)">
          <Box
            flex="0 0 auto"
            fontSize="11px"
            letterSpacing="0.42em"
            textTransform="uppercase"
            color="rgba(247,239,221,0.45)"
            pb="8px"
            css={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Photography
          </Box>
          <Heading
            as="h1"
            flex="1 1 380px"
            minW="0"
            fontFamily="display"
            fontWeight="600"
            fontSize="clamp(44px,8vw,124px)"
            lineHeight="0.88"
            letterSpacing="-0.02em"
            m="0"
            color="cream"
          >
            On stage,
            <br />
            <Box as="span" fontStyle="italic" color="amberBright">
              off stage
            </Box>
          </Heading>
          <Text
            flex="1 1 260px"
            minW="0"
            maxW="44ch"
            mb="12px"
            fontSize="16px"
            lineHeight="1.7"
            color="rgba(247,239,221,0.68)"
          >
            Live performances, portraits and the quiet hours between soundcheck
            and the first song.
          </Text>
        </Flex>

        <Flex wrap="wrap" gap="10px" mt="52px">
          {GALLERY_CATEGORIES.map((c) => (
            <FilterButton key={c.key} active={cat === c.key} onClick={() => selectCat(c.key)}>
              {c.label}
            </FilterButton>
          ))}
        </Flex>

        <FilmStrip mt="44px" />
      </Box>

      <Box as="section" id="gallery" maxW="shell" mx="auto" pt="clamp(36px,5vw,56px)" px="gutter" pb="40px">
        <Box css={{ columns: "3 260px", columnGap: "clamp(14px,2vw,24px)" }}>
          {visible.map((p, i) => (
            <Box key={p.id} mb="24px" css={{ breakInside: "avoid" }}>
              <Box
                as="button"
                type="button"
                onClick={() => setActive(i)}
                position="relative"
                display="block"
                w="100%"
                p="0"
                cursor="pointer"
                overflow="hidden"
                textAlign="left"
                border="1px solid"
                borderColor="rgba(139,90,43,0.45)"
                bg="ink"
              >
                <Box
                  role="img"
                  aria-label={p.caption}
                  display="block"
                  w="100%"
                  bgColor="surface2"
                  css={{
                    aspectRatio: String(p.ratio),
                    backgroundImage: `url(${p.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <Box
                  position="absolute"
                  inset="0"
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-end"
                  p="22px"
                  css={{
                    background:
                      "linear-gradient(0deg,rgba(36,26,16,0.9),rgba(36,26,16,0) 62%)",
                  }}
                >
                  <Box
                    fontFamily="mono"
                    fontSize="11px"
                    letterSpacing="0.1em"
                    textTransform="uppercase"
                    color="amber"
                  >
                    {p.slot}
                  </Box>
                  <Box fontFamily="display" fontSize="20px" mt="6px" color="cream">
                    {p.caption}
                  </Box>
                </Box>
                <Box
                  position="absolute"
                  top="16px"
                  right="16px"
                  fontFamily="mono"
                  fontSize="11px"
                  color="rgba(247,239,221,0.55)"
                >
                  {String(i + 1).padStart(2, "0")}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {visible.length === 0 && (
          <Text fontSize="16px" color="rgba(247,239,221,0.6)">
            No photos in this category yet.
          </Text>
        )}
      </Box>

      <Box as="section" maxW="shell" mx="auto" px="gutter" pb="clamp(56px,8vw,96px)">
        <FilmStrip />
        <Flex justify="space-between" align="baseline" gap="24px" wrap="wrap" mt="32px">
          <Box fontSize="14px" color="rgba(247,239,221,0.5)">
            Press-use photography available on request.
          </Box>
          <Link href={`mailto:${CONTACT.press}`} fontFamily="display" fontSize="22px">
            {CONTACT.press}
          </Link>
        </Flex>
      </Box>

      <Lightbox
        items={visible.map((p) => ({ ...p, src: p.full || p.src }))}
        index={active}
        onIndexChange={setActive}
        onClose={() => setActive(null)}
      />
    </>
  );
}

Gallery.getLayout = withSiteLayout({
  title: "Gallery",
  description: "Live performances, portraits and behind the scenes with Ebo Krdum.",
});
