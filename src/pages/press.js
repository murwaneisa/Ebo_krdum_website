import { useState } from "react";
import { Box, Flex, Grid, Heading, Link, Text } from "@chakra-ui/react";
import { withSiteLayout } from "@/components/layout/SiteLayout";
import FilmStrip from "@/components/common/FilmStrip";
import Lightbox from "@/components/common/Lightbox";
import { CONTACT } from "@/data/site";
import { REVIEWS } from "@/data/reviews";
import { PRESS_DOWNLOADS, PRESS_PHOTOS } from "@/data/photos";

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
      px="22px"
      py="13px"
      minH="46px"
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
      gap="16px"
      alignItems="flex-start"
      border="1px solid"
      borderColor="rgba(139,90,43,0.6)"
      bg="ink"
      px="24px"
      py="22px"
      _hover={{ borderColor: "amber" }}
    >
      <Box
        flex="0 0 auto"
        fontFamily="mono"
        fontSize="11px"
        letterSpacing="0.1em"
        color="ink"
        bg="amber"
        px="9px"
        py="6px"
      >
        {kind}
      </Box>
      <Box>
        <Box fontFamily="display" fontSize="19px" color="cream">
          {title}
        </Box>
        <Box mt="6px" fontSize="13px" lineHeight="1.6" color="rgba(247,239,221,0.55)">
          {note}
        </Box>
      </Box>
    </Link>
  );
}

export default function Press() {
  const [lang, setLang] = useState("en");
  const [photo, setPhoto] = useState(null);
  const en = lang === "en";

  return (
    <>
      <Box as="section" maxW="shell" mx="auto" pt="clamp(36px,5vw,60px)" px="gutter">
        <Box border="1px solid" borderColor="rgba(232,169,58,0.55)" bg="surface" p="clamp(26px,3.4vw,48px)">
          <Flex wrap="wrap" gap="24px clamp(28px,4vw,56px)" align="center">
            <Box flex="1 1 340px" minW="0">
              <Box fontSize="11px" letterSpacing="0.24em" textTransform="uppercase" color="bronze">
                Press kit
              </Box>
              <Heading
                as="h1"
                mt="14px"
                fontFamily="display"
                fontSize="clamp(26px,3vw,38px)"
                lineHeight="1.1"
                fontWeight="500"
                color="cream"
              >
                Photos, bio and stage plots
              </Heading>
              <Text mt="14px" fontSize="15px" lineHeight="1.7" color="rgba(247,239,221,0.62)" maxW="52ch">
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
              fontSize="12px"
              letterSpacing="0.14em"
              textTransform="uppercase"
              fontWeight="600"
              color="ink"
              bg="amber"
              border="0"
              px="28px"
              py="17px"
              minH="52px"
              cursor="pointer"
              _hover={{ bg: "amberBright" }}
            >
              Press photos
            </Box>
          </Flex>

          <Box
            mt="clamp(28px,3.4vw,44px)"
            borderTop="1px solid"
            borderColor="rgba(139,90,43,0.5)"
            pt="clamp(26px,3vw,38px)"
            display="grid"
            gap="clamp(24px,3vw,36px)"
          >
            <Box>
              <Box fontSize="11px" letterSpacing="0.24em" textTransform="uppercase" color="bronze" mb="18px">
                Press photos — click to enlarge and download
              </Box>
              <Grid templateColumns="repeat(auto-fill,minmax(180px,1fr))" gap="clamp(12px,1.6vw,18px)">
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
                      px="12px"
                      py="10px"
                      fontSize="11px"
                      letterSpacing="0.12em"
                      textTransform="uppercase"
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

            <Grid templateColumns="repeat(auto-fit,minmax(260px,1fr))" gap="clamp(14px,1.8vw,20px)">
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
      <Box as="section" maxW="shell" mx="auto" pt="clamp(36px,5vw,64px)" px="gutter">
        <Flex justify="flex-end" mb="24px">
          <Flex border="1px solid" borderColor="bronze" borderRadius="2px" overflow="hidden">
            <LangButton active={en} onClick={() => setLang("en")}>
              English
            </LangButton>
            <LangButton active={!en} onClick={() => setLang("sv")}>
              Svenska
            </LangButton>
          </Flex>
        </Flex>

        <Grid templateColumns="repeat(auto-fit,minmax(330px,1fr))" gap="clamp(20px,2.4vw,32px)">
          {REVIEWS.map((r) => (
            <Link
              key={r.id}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              display="flex"
              flexDirection="column"
              gap="20px"
              bg="surface"
              border="1px solid"
              borderColor="rgba(139,90,43,0.45)"
              p="clamp(24px,2.8vw,38px)"
              color="cream"
              _hover={{ borderColor: "amber", color: "cream" }}
            >
              <Flex wrap="wrap" align="baseline" gap="10px 16px">
                <Box fontFamily="display" fontSize="clamp(20px,2vw,26px)" color="amber">
                  {r.outlet}
                </Box>
                <Box fontSize="11px" letterSpacing="0.2em" textTransform="uppercase" color="bronze">
                  {en ? "Translated from Swedish" : "Svensk original"}
                </Box>
              </Flex>
              <Text
                as="blockquote"
                m="0"
                fontFamily="display"
                fontSize="clamp(17px,1.5vw,21px)"
                lineHeight="1.55"
                color="rgba(247,239,221,0.9)"
                css={{ textWrap: "pretty" }}
              >
                {en ? r.en : r.sv}
              </Text>
              <Box
                mt="auto"
                fontSize="12px"
                letterSpacing="0.14em"
                textTransform="uppercase"
                fontWeight="600"
                color="amber"
              >
                Read the article →
              </Box>
            </Link>
          ))}
        </Grid>
        <FilmStrip mt="clamp(48px,6vw,80px)" />
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

Press.getLayout = withSiteLayout({
  title: "Press",
  description:
    "Press kit for Ebo Krdum — high-resolution photos, stage plots, bio and reviews.",
});
