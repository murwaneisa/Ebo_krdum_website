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
  fontSize: "xs",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  fontWeight: "600",
  px: "6",
  py: "3.5",
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
      <Box as="section" maxW="shell" mx="auto" pt="clamp(2.5rem,6vw,4.5rem)" px="gutter">
        <Flex wrap="wrap" align="flex-end" gap="1.75rem clamp(1.5rem,3vw,3rem)">
          <Box
            flex="0 0 auto"
            textStyle="microLabel"
            letterSpacing="0.42em"
            color="rgba(247,239,221,0.45)"
            pb="2"
            css={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Biography
          </Box>
          <Heading
            as="h1"
            flex="1 1 26.25rem"
            minW="0"
            textStyle="pageTitle"
            lineHeight="0.92"
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
        <FilmStrip mt="clamp(2.25rem,5vw,3.5rem)" />
      </Box>

      {/* Portrait, lead paragraph, facts and long-form prose */}
      <Box as="section" maxW="shell" mx="auto" pt="clamp(2.75rem,6vw,4.5rem)" px="gutter">
        <Flex wrap="wrap" gap="clamp(1.75rem,4vw,4rem)" align="flex-start">
          <Box as="figure" m="0" flex="1 1 clamp(17.5rem,28vw,25rem)" maxW="25rem">
            <PortraitFrame src={portrait} alt="Ebo Krdum with an acoustic guitar" ratio="4/5" />
            <Box
              as="figcaption"
              mt="3.5"
              textStyle="eyebrow"
              letterSpacing="0.14em"
              color="rgba(247,239,221,0.45)"
            >
              {PORTRAIT_CAPTION}
            </Box>
          </Box>

          <Box flex="1 1 26.25rem" minW="0">
            <Text
              m="0"
              fontFamily="display"
              fontSize="xl"
              lineHeight="1.45"
              color="cream"
              css={{ textWrap: "pretty" }}
            >
              {INTRO}
            </Text>
            <Flex
              wrap="wrap"
              gap="1.75rem 2.75rem"
              mt="9"
              pt="7"
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
            css={{ columns: "2 21.25rem", columnGap: "clamp(2rem,4vw,4rem)" }}
          >
            {PROSE.map((p, i) => (
              <Text
                key={p.slice(0, 24)}
                m="0"
                mt={i === 0 ? "0" : "6"}
                fontSize="lg"
                lineHeight="1.8"
                color="rgba(247,239,221,0.78)"
                css={{ textWrap: "pretty" }}
              >
                {p}
              </Text>
            ))}
          </Box>
        </Flex>
        <FilmStrip mt="clamp(3.5rem,7vw,5.5rem)" />
      </Box>

      {/* Tabbed chapters */}
      <Box as="section" maxW="shell" mx="auto" pt="clamp(2.75rem,6vw,4rem)" px="gutter">
        <Tabs.Root defaultValue={SECTIONS[0].key} lazyMount unmountOnExit={false}>
          <Tabs.List display="flex" flexWrap="wrap" gap="3" border="none">
            {SECTIONS.map((s) => (
              <Tabs.Trigger key={s.key} value={s.key} asChild>
                <Box as="button" type="button" {...triggerStyle(false)} _selected={triggerStyle(true)}>
                  {s.label}
                </Box>
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {SECTIONS.map((s) => (
            <Tabs.Content key={s.key} value={s.key} mt="clamp(2.25rem,5vw,3.5rem)" p="0">
              <Grid templateColumns="repeat(auto-fit,minmax(18.75rem,1fr))" gap="clamp(2rem,4vw,4rem)" alignItems="start">
                <Box>
                  <Eyebrow tone="amber" mb="5">
                    {s.kicker}
                  </Eyebrow>
                  <Heading
                    as="h2"
                    textStyle="section"
                    m="0"
                    color="cream"
                    css={{ textWrap: "balance" }}
                  >
                    {s.title}
                  </Heading>
                  {s.quote && (
                    <Box as="blockquote" mt="9" pt="7" borderTop="1px solid" borderColor="rgba(139,90,43,0.5)">
                      <Box fontFamily="display" fontSize="5xl" lineHeight="0.6" color="bronze">
                        &ldquo;
                      </Box>
                      <Text
                        mt="3"
                        fontFamily="display"
                        fontStyle="italic"
                        fontSize="lg"
                        lineHeight="1.6"
                        color="rgba(247,239,221,0.9)"
                        css={{ textWrap: "pretty" }}
                      >
                        {s.quote}
                      </Text>
                      <Box mt="4" textStyle="microLabel" letterSpacing="0.24em" color="bronze">
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
                      mt={i === 0 ? "0" : "6"}
                      fontSize="lg"
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
        mt="clamp(3.5rem,7vw,5.5rem)"
        borderTop="1px solid"
        borderBottom="1px solid"
        borderColor="rgba(139,90,43,0.4)"
      >
        <Box maxW="shell" mx="auto" py="clamp(3.25rem,7vw,5.5rem)" px="gutter">
          <Grid templateColumns="repeat(auto-fit,minmax(18.75rem,1fr))" gap="clamp(2rem,4vw,4rem)" alignItems="start">
            <Box>
              <Eyebrow tone="amber" mb="5">
                Musical ideology
              </Eyebrow>
              <Text
                m="0"
                fontFamily="display"
                fontSize="2xl"
                lineHeight="1.42"
                color="cream"
                css={{ textWrap: "pretty" }}
              >
                {IDEOLOGY.statement}
              </Text>
            </Box>
            <Box>
              <Eyebrow mb="5">Inspirational words</Eyebrow>
              <Text m="0" fontSize="lg" lineHeight="1.8" color="rgba(247,239,221,0.78)" css={{ textWrap: "pretty" }}>
                {IDEOLOGY.inspiration}
              </Text>
              <Box as="blockquote" mt="8" pt="6" borderTop="1px solid" borderColor="rgba(139,90,43,0.5)">
                <Text
                  m="0"
                  fontFamily="display"
                  fontStyle="italic"
                  fontSize="lg"
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
      <Box as="section" maxW="shell" mx="auto" pt="clamp(3.25rem,7vw,5.5rem)" px="gutter">
        <Flex wrap="wrap" align="flex-end" justify="space-between" gap="1.25rem 2rem">
          <Heading
            as="h2"
            textStyle="sectionSm"
            m="0"
            color="cream"
          >
            Influences
          </Heading>
          <Box textStyle="meta" color="rgba(247,239,221,0.5)" maxW="40ch">
            Artists who left an impression on Ebo the kid, and the artist today.
          </Box>
        </Flex>
        <Flex mt="8" wrap="wrap" gap="2.5">
          {INFLUENCES.map((name) => (
            <Box
              key={name}
              border="1px solid"
              borderColor="rgba(139,90,43,0.55)"
              px="4.5"
              py="3"
              fontFamily="display"
              fontSize="lg"
              color="rgba(247,239,221,0.86)"
            >
              {name}
            </Box>
          ))}
        </Flex>
        <FilmStrip mt="clamp(3.25rem,7vw,5rem)" />
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
