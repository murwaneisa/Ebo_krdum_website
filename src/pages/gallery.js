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
      textStyle="microLabel"
      letterSpacing="0.14em"
      fontWeight="600"
      px="6"
      py="3"
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
      <Box as="section" maxW="shell" mx="auto" pt="clamp(3.25rem,7vw,5.5rem)" px="gutter">
        <Flex wrap="wrap" align="flex-end" gap="1.75rem clamp(1.5rem,3vw,3rem)">
          <Box
            flex="0 0 auto"
            textStyle="microLabel"
            letterSpacing="0.42em"
            color="rgba(247,239,221,0.45)"
            pb="2"
            css={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Photography
          </Box>
          <Heading
            as="h1"
            flex="1 1 23.75rem"
            minW="0"
            textStyle="pageTitle"
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
            flex="1 1 16.25rem"
            minW="0"
            maxW="44ch"
            mb="3"
            textStyle="body"
            lineHeight="1.7"
            color="rgba(247,239,221,0.68)"
          >
            Live performances, portraits and the quiet hours between soundcheck
            and the first song.
          </Text>
        </Flex>

        <Flex wrap="wrap" gap="2.5" mt="14">
          {GALLERY_CATEGORIES.map((c) => (
            <FilterButton key={c.key} active={cat === c.key} onClick={() => selectCat(c.key)}>
              {c.label}
            </FilterButton>
          ))}
        </Flex>

        <FilmStrip mt="11" />
      </Box>

      <Box as="section" id="gallery" maxW="shell" mx="auto" pt="clamp(2.25rem,5vw,3.5rem)" px="gutter" pb="10">
        <Box css={{ columns: "3 16.25rem", columnGap: "clamp(0.875rem,2vw,1.5rem)" }}>
          {visible.map((p, i) => (
            <Box key={p.id} mb="6" css={{ breakInside: "avoid" }}>
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
                  p="6"
                  css={{
                    background:
                      "linear-gradient(0deg,rgba(36,26,16,0.9),rgba(36,26,16,0) 62%)",
                  }}
                >
                  <Box
                    fontFamily="mono"
                    textStyle="microLabel"
                    letterSpacing="0.1em"
                    color="amber"
                  >
                    {p.slot}
                  </Box>
                  <Box fontFamily="display" textStyle="cardTitle" mt="1.5" color="cream">
                    {p.caption}
                  </Box>
                </Box>
                <Box
                  position="absolute"
                  top="4"
                  right="4"
                  fontFamily="mono"
                  fontSize="2xs"
                  color="rgba(247,239,221,0.55)"
                >
                  {String(i + 1).padStart(2, "0")}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {visible.length === 0 && (
          <Text textStyle="body" color="rgba(247,239,221,0.6)">
            No photos in this category yet.
          </Text>
        )}
      </Box>

      <Box as="section" maxW="shell" mx="auto" px="gutter" pb="clamp(3.5rem,8vw,6rem)">
        <FilmStrip />
        <Flex justify="space-between" align="baseline" gap="6" wrap="wrap" mt="8">
          <Box textStyle="meta" color="rgba(247,239,221,0.5)">
            Press-use photography available on request.
          </Box>
          <Link href={`mailto:${CONTACT.press}`} fontFamily="display" fontSize="xl">
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
