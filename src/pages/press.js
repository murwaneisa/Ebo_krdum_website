import { useState } from "react";
import { Box, Flex, Grid, Heading, Link, Text } from "@chakra-ui/react";
import { withSiteLayout } from "@/components/layout/SiteLayout";
import FilmStrip from "@/components/common/FilmStrip";
import Lightbox from "@/components/common/Lightbox";
import { CONTACT } from "@/data/site";
import ReviewLogo from "@/components/common/ReviewLogo";
import { getReviews, isFallback, textFor } from "@/lib/reviews";
import { PRESS_DOWNLOADS, PRESS_PHOTOS } from "@/data/photos";

function LangButton({ active, children, onClick }) {
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
      py="3.5"
      minH="12"
      border="none"
      cursor="pointer"
      bg={active ? "amber" : "transparent"}
      color={active ? "ink" : "rgba(247,239,221,0.7)"}
    >
      {children}
    </Box>
  );
}

function DownloadCard({ kind, title, note, href, external = true }) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      display="flex"
      gap="4"
      alignItems="flex-start"
      border="1px solid"
      borderColor="rgba(139,90,43,0.6)"
      bg="ink"
      px="6"
      py="6"
      _hover={{ borderColor: "amber" }}
    >
      <Box
        flex="0 0 auto"
        fontFamily="mono"
        fontSize="2xs"
        letterSpacing="0.1em"
        color="ink"
        bg="amber"
        px="2.5"
        py="1.5"
      >
        {kind}
      </Box>
      <Box>
        <Box fontFamily="display" fontSize="lg" color="cream">
          {title}
        </Box>
        <Box mt="1.5" textStyle="meta" color="rgba(247,239,221,0.55)">
          {note}
        </Box>
      </Box>
    </Link>
  );
}

export default function Press({ reviews = [] }) {
  const [lang, setLang] = useState("en");
  const [photo, setPhoto] = useState(null);
  const en = lang === "en";

  return (
    <>
      <Box as="section" maxW="shell" mx="auto" pt="clamp(2.25rem,5vw,3.75rem)" px="gutter">
        <Box border="1px solid" borderColor="rgba(232,169,58,0.55)" bg="surface" p="clamp(1.625rem,3.4vw,3rem)">
          <Flex wrap="wrap" gap="1.5rem clamp(1.75rem,4vw,3.5rem)" align="center">
            <Box flex="1 1 21.25rem" minW="0">
              <Box textStyle="microLabel" letterSpacing="0.24em" color="bronze">
                Press kit
              </Box>
              <Heading
                as="h1"
                mt="3.5"
                textStyle="sectionSm"
                lineHeight="1.1"
                color="cream"
              >
                Photos, bio and stage plots
              </Heading>
              <Text mt="3.5" textStyle="body" lineHeight="1.7" color="rgba(247,239,221,0.62)" maxW="52ch">
                High-resolution press images with photographer credits, plus the
                stage plot and technical rider as PDF.
              </Text>
            </Box>
            <Box
              as="button"
              type="button"
              onClick={() => setPhoto(0)}
              flex="0 0 auto"
              fontFamily="body"
              textStyle="microLabel"
              letterSpacing="0.14em"
              fontWeight="600"
              color="ink"
              bg="amber"
              border="0"
              px="7"
              py="4.5"
              minH="14"
              cursor="pointer"
              _hover={{ bg: "amberBright" }}
            >
              Press photos
            </Box>
          </Flex>

          <Box
            mt="clamp(1.75rem,3.4vw,2.75rem)"
            borderTop="1px solid"
            borderColor="rgba(139,90,43,0.5)"
            pt="clamp(1.625rem,3vw,2.375rem)"
            display="grid"
            gap="clamp(1.5rem,3vw,2.25rem)"
          >
            <Box>
              <Box textStyle="microLabel" letterSpacing="0.24em" color="bronze" mb="4.5">
                Press photos — click to enlarge and download
              </Box>
              <Grid templateColumns="repeat(auto-fill,minmax(11.25rem,1fr))" gap="clamp(0.75rem,1.6vw,1.125rem)">
                {PRESS_PHOTOS.map((p, i) => (
                  <Box
                    key={p.id}
                    as="button"
                    type="button"
                    onClick={() => setPhoto(i)}
                    aria-label={p.caption}
                    position="relative"
                    display="block"
                    w="100%"
                    p="0"
                    cursor="pointer"
                    border="1px solid"
                    borderColor="rgba(139,90,43,0.6)"
                    bgColor="ink"
                    css={{
                      aspectRatio: "4 / 5",
                      backgroundImage: `url(${p.src})`,
                      backgroundSize: "cover",
                      backgroundPosition: "50% 30%",
                    }}
                  >
                    <Box
                      position="absolute"
                      left="0"
                      right="0"
                      bottom="0"
                      px="3"
                      py="2.5"
                      textStyle="microLabel"
                      letterSpacing="0.12em"
                      color="cream"
                      textAlign="left"
                      css={{
                        background:
                          "linear-gradient(0deg,rgba(20,14,8,0.88) 0%,rgba(20,14,8,0) 100%)",
                      }}
                    >
                      {p.credit}
                    </Box>
                  </Box>
                ))}
              </Grid>
            </Box>

            <Grid templateColumns="repeat(auto-fit,minmax(16.25rem,1fr))" gap="clamp(0.875rem,1.8vw,1.25rem)">
              {PRESS_DOWNLOADS.map((d) => (
                <DownloadCard key={d.title} {...d} />
              ))}
              <DownloadCard
                kind="@"
                title="Ask for anything else"
                note={`${CONTACT.press} · ${CONTACT.phone}`}
                href={`mailto:${CONTACT.press}?subject=${encodeURIComponent("Press request — Ebo Krdum")}`}
                external={false}
              />
            </Grid>
          </Box>
        </Box>
      </Box>

      {/* Reviews */}
      <Box as="section" maxW="shell" mx="auto" pt="clamp(2.25rem,5vw,4rem)" px="gutter">
        <Flex justify="flex-end" mb="6">
          <Flex border="1px solid" borderColor="bronze" borderRadius="2px" overflow="hidden">
            <LangButton active={en} onClick={() => setLang("en")}>
              English
            </LangButton>
            <LangButton active={!en} onClick={() => setLang("sv")}>
              Svenska
            </LangButton>
          </Flex>
        </Flex>

        <Grid templateColumns="repeat(auto-fit,minmax(20.625rem,1fr))" gap="clamp(1.25rem,2.4vw,2rem)">
          {reviews.map((r) => (
            <Link
              key={r.id}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              display="flex"
              flexDirection="column"
              gap="5"
              bg="surface"
              border="1px solid"
              borderColor="rgba(139,90,43,0.45)"
              p="clamp(1.5rem,2.8vw,2.375rem)"
              color="cream"
              _hover={{ borderColor: "amber", color: "cream" }}
            >
              <Flex wrap="wrap" align="center" gap="0.75rem 1rem">
                {r.logo ? (
                  <ReviewLogo logo={r.logo} alt={r.outlet} height={28} />
                ) : (
                  <Box fontFamily="display" fontSize="xl" color="amber">
                    {r.outlet}
                  </Box>
                )}
                <Box textStyle="microLabel" color="bronze">
                  {isFallback(r, en ? "en" : "sv")
                    ? en
                      ? "Swedish original"
                      : "English translation"
                    : en
                      ? "Translated from Swedish"
                      : "Svensk original"}
                </Box>
              </Flex>
              <Text
                as="blockquote"
                m="0"
                fontFamily="display"
                fontSize="lg"
                lineHeight="1.55"
                color="rgba(247,239,221,0.9)"
                css={{ textWrap: "pretty" }}
              >
                {textFor(r, en ? "en" : "sv")}
              </Text>
              <Box
                mt="auto"
                textStyle="microLabel"
                letterSpacing="0.14em"
                fontWeight="600"
                color="amber"
              >
                {r.outlet} — read the article →
              </Box>
            </Link>
          ))}
        </Grid>
        <FilmStrip mt="clamp(3rem,6vw,5rem)" />
      </Box>

      <Lightbox
        items={PRESS_PHOTOS.map((p, i) => ({
          ...p,
          slot: `Press photo ${String(i + 1).padStart(2, "0")} / ${String(PRESS_PHOTOS.length).padStart(2, "0")}`,
          caption: p.credit,
        }))}
        index={photo}
        onIndexChange={setPhoto}
        onClose={() => setPhoto(null)}
        showDownload
      />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: { reviews: await getReviews() },
    revalidate: 60 * 60,
  };
}

Press.getLayout = withSiteLayout({
  title: "Press",
  description:
    "Press kit for Ebo Krdum — high-resolution photos, stage plots, bio and reviews.",
});
