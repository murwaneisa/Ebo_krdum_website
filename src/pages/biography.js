import { Box, Flex, Grid, Heading, Tabs, Text } from "@chakra-ui/react";
import { withSiteLayout } from "@/components/layout/SiteLayout";
import Eyebrow from "@/components/common/Eyebrow";
import FilmStrip from "@/components/common/FilmStrip";
import MetaItem from "@/components/common/MetaItem";
import PortraitFrame from "@/components/common/PortraitFrame";
import { cmsFetch, imageUrl } from "@/lib/cms";
import {
  HEADLINE,
  IDEOLOGY,
  INFLUENCES,
  INTRO,
  META,
  PORTRAIT_CAPTION,
  PROSE,
  SECTIONS,
} from "@/data/biography";

const triggerStyle = (selected) => ({
  fontFamily: "body",
  fontSize: "12px",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  fontWeight: "600",
  px: "22px",
  py: "13px",
  cursor: "pointer",
  borderRadius: "2px",
  border: "1px solid",
  borderColor: selected ? "amber" : "rgba(139,90,43,0.6)",
  bg: selected ? "amber" : "transparent",
  color: selected ? "ink" : "rgba(247,239,221,0.72)",
});

export default function Biography({ portrait }) {
  return (
    <>
      {/* Title */}
      <Box as="section" maxW="shell" mx="auto" pt="clamp(40px,6vw,72px)" px="gutter">
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
            Biography
          </Box>
          <Heading
            as="h1"
            flex="1 1 420px"
            minW="0"
            fontFamily="display"
            fontWeight="600"
            fontSize="clamp(40px,6.4vw,104px)"
            lineHeight="0.92"
            letterSpacing="-0.02em"
            m="0"
            color="cream"
            css={{ textWrap: "balance" }}
          >
            {HEADLINE.lead}{" "}
            <Box as="span" fontStyle="italic" color="amberBright">
              {HEADLINE.accent}
            </Box>
          </Heading>
        </Flex>
        <FilmStrip mt="clamp(36px,5vw,56px)" />
      </Box>

      {/* Portrait, lead paragraph, facts and long-form prose */}
      <Box as="section" maxW="shell" mx="auto" pt="clamp(44px,6vw,72px)" px="gutter">
        <Flex wrap="wrap" gap="clamp(28px,4vw,64px)" align="flex-start">
          <Box as="figure" m="0" flex="1 1 clamp(280px,28vw,400px)" maxW="400px">
            <PortraitFrame src={portrait} alt="Ebo Krdum with an acoustic guitar" ratio="4/5" />
            <Box
              as="figcaption"
              mt="14px"
              fontSize="12px"
              letterSpacing="0.14em"
              textTransform="uppercase"
              color="rgba(247,239,221,0.45)"
            >
              {PORTRAIT_CAPTION}
            </Box>
          </Box>

          <Box flex="1 1 420px" minW="0">
            <Text
              m="0"
              fontFamily="display"
              fontSize="clamp(21px,2.2vw,27px)"
              lineHeight="1.45"
              color="cream"
              css={{ textWrap: "pretty" }}
            >
              {INTRO}
            </Text>
            <Flex
              wrap="wrap"
              gap="28px 44px"
              mt="36px"
              pt="28px"
              borderTop="1px solid"
              borderColor="rgba(139,90,43,0.45)"
            >
              {META.map((m) => (
                <MetaItem key={m.label} {...m} />
              ))}
            </Flex>
          </Box>

          <Box
            flex="1 1 100%"
            minW="0"
            css={{ columns: "2 340px", columnGap: "clamp(32px,4vw,64px)" }}
          >
            {PROSE.map((p, i) => (
              <Text
                key={p.slice(0, 24)}
                m="0"
                mt={i === 0 ? "0" : "24px"}
                fontSize="17px"
                lineHeight="1.8"
                color="rgba(247,239,221,0.78)"
                css={{ textWrap: "pretty" }}
              >
                {p}
              </Text>
            ))}
          </Box>
        </Flex>
        <FilmStrip mt="clamp(56px,7vw,88px)" />
      </Box>

      {/* Tabbed chapters */}
      <Box as="section" maxW="shell" mx="auto" pt="clamp(44px,6vw,64px)" px="gutter">
        <Tabs.Root defaultValue={SECTIONS[0].key} lazyMount unmountOnExit={false}>
          <Tabs.List display="flex" flexWrap="wrap" gap="12px" border="none">
            {SECTIONS.map((s) => (
              <Tabs.Trigger key={s.key} value={s.key} asChild>
                <Box as="button" type="button" {...triggerStyle(false)} _selected={triggerStyle(true)}>
                  {s.label}
                </Box>
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {SECTIONS.map((s) => (
            <Tabs.Content key={s.key} value={s.key} mt="clamp(36px,5vw,56px)" p="0">
              <Grid templateColumns="repeat(auto-fit,minmax(300px,1fr))" gap="clamp(32px,4vw,64px)" alignItems="start">
                <Box>
                  <Eyebrow tone="amber" mb="20px">
                    {s.kicker}
                  </Eyebrow>
                  <Heading
                    as="h2"
                    fontFamily="display"
                    fontSize="clamp(32px,4.4vw,60px)"
                    lineHeight="1"
                    fontWeight="500"
                    m="0"
                    color="cream"
                    css={{ textWrap: "balance" }}
                  >
                    {s.title}
                  </Heading>
                  {s.quote && (
                    <Box as="blockquote" mt="36px" pt="28px" borderTop="1px solid" borderColor="rgba(139,90,43,0.5)">
                      <Box fontFamily="display" fontSize="44px" lineHeight="0.6" color="bronze">
                        &ldquo;
                      </Box>
                      <Text
                        mt="12px"
                        fontFamily="display"
                        fontStyle="italic"
                        fontSize="clamp(18px,1.7vw,21px)"
                        lineHeight="1.6"
                        color="rgba(247,239,221,0.9)"
                        css={{ textWrap: "pretty" }}
                      >
                        {s.quote}
                      </Text>
                      <Box mt="16px" fontSize="11px" letterSpacing="0.24em" textTransform="uppercase" color="bronze">
                        Ebo Krdum
                      </Box>
                    </Box>
                  )}
                </Box>

                <Box>
                  {s.paras.map((p, i) => (
                    <Text
                      key={p.slice(0, 24)}
                      m="0"
                      mt={i === 0 ? "0" : "24px"}
                      fontSize="17px"
                      lineHeight="1.8"
                      color="rgba(247,239,221,0.78)"
                      css={{ textWrap: "pretty" }}
                    >
                      {p}
                    </Text>
                  ))}
                </Box>
              </Grid>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </Box>

      {/* Ideology band */}
      <Box
        as="section"
        bg="surface"
        mt="clamp(56px,7vw,88px)"
        borderTop="1px solid"
        borderBottom="1px solid"
        borderColor="rgba(139,90,43,0.4)"
      >
        <Box maxW="shell" mx="auto" py="clamp(52px,7vw,88px)" px="gutter">
          <Grid templateColumns="repeat(auto-fit,minmax(300px,1fr))" gap="clamp(32px,4vw,64px)" alignItems="start">
            <Box>
              <Eyebrow tone="amber" mb="20px">
                Musical ideology
              </Eyebrow>
              <Text
                m="0"
                fontFamily="display"
                fontSize="clamp(22px,2.4vw,30px)"
                lineHeight="1.42"
                color="cream"
                css={{ textWrap: "pretty" }}
              >
                {IDEOLOGY.statement}
              </Text>
            </Box>
            <Box>
              <Eyebrow mb="20px">Inspirational words</Eyebrow>
              <Text m="0" fontSize="17px" lineHeight="1.8" color="rgba(247,239,221,0.78)" css={{ textWrap: "pretty" }}>
                {IDEOLOGY.inspiration}
              </Text>
              <Box as="blockquote" mt="32px" pt="24px" borderTop="1px solid" borderColor="rgba(139,90,43,0.5)">
                <Text
                  m="0"
                  fontFamily="display"
                  fontStyle="italic"
                  fontSize="18px"
                  lineHeight="1.6"
                  color="rgba(247,239,221,0.88)"
                  css={{ textWrap: "pretty" }}
                >
                  {IDEOLOGY.quote}
                </Text>
              </Box>
            </Box>
          </Grid>
        </Box>
      </Box>

      {/* Influences */}
      <Box as="section" maxW="shell" mx="auto" pt="clamp(52px,7vw,88px)" px="gutter">
        <Flex wrap="wrap" align="flex-end" justify="space-between" gap="20px 32px">
          <Heading
            as="h2"
            fontFamily="display"
            fontSize="clamp(28px,3.4vw,44px)"
            lineHeight="1"
            fontWeight="500"
            m="0"
            color="cream"
          >
            Influences
          </Heading>
          <Box fontSize="13px" color="rgba(247,239,221,0.5)" maxW="40ch">
            Artists who left an impression on Ebo the kid, and the artist today.
          </Box>
        </Flex>
        <Flex mt="32px" wrap="wrap" gap="10px">
          {INFLUENCES.map((name) => (
            <Box
              key={name}
              border="1px solid"
              borderColor="rgba(139,90,43,0.55)"
              px="18px"
              py="11px"
              fontFamily="display"
              fontSize="17px"
              color="rgba(247,239,221,0.86)"
            >
              {name}
            </Box>
          ))}
        </Flex>
        <FilmStrip mt="clamp(52px,7vw,80px)" />
      </Box>
    </>
  );
}

Biography.getLayout = withSiteLayout({
  title: "Biography",
  description:
    "Sudanese-Swedish singer, guitarist and activist Ebo Krdum — from Darfur to Stockholm.",
});

export async function getStaticProps() {
  // The portrait is optional: if Sanity has no bio image the frame renders empty
  // rather than the page failing.
  const bio = await cmsFetch(
    `*[_type == "biography" && defined(bioImage)][0]{ bioImage }`,
    {},
    null
  );

  return {
    props: {
      portrait: bio?.bioImage ? imageUrl(bio.bioImage, 900, 82) : null,
    },
    revalidate: 60 * 60 * 24,
  };
}
