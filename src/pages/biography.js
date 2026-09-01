import { Box, Flex, Grid, Heading, Tabs, Text } from "@chakra-ui/react";
import { withSiteLayout } from "@/components/layout/SiteLayout";
import Eyebrow from "@/components/common/Eyebrow";
import FilmStrip from "@/components/common/FilmStrip";
import MetaItem from "@/components/common/MetaItem";
import PortraitFrame from "@/components/common/PortraitFrame";
import SectionHeading from "@/components/common/SectionHeading";
import { cmsFetch, imageUrl } from "@/lib/cms";
import {
  IDEOLOGY,
  INFLUENCES,
  INTRO,
  META,
  PORTRAIT_CAPTION,
  PROSE,
  SECTIONS,
} from "@/data/biography";

/*
 * The fallback for the page title. It is edited in two halves because the second
 * is set in italic amber — the split is a typographic decision, so the artist has
 * to make it; the site cannot infer it from one sentence. Kept here rather than in
 * @/data/biography so that the bundled copy is reachable only from getStaticProps,
 * and webpack can drop it from the browser bundle instead of shipping the whole
 * biography twice.
 */
const HEADLINE = { lead: "A voice rising from the", accent: "ashes of war" };

/*
 * `portrait` is selected whole, not dereferenced: imageUrl() builds the CDN URL
 * from the asset ref itself (see lib/cms.js), so `portrait.asset->url` would hand
 * it something it cannot size.
 *
 * `_key` on chapters is Sanity's own per-item id, and it is what the tab strip
 * uses to tell one tab from another. A projection drops it unless it is asked for.
 *
 * `story` and `influences` are selected bare because they are arrays of plain
 * strings — a `[]{...}` projection on those returns nothing.
 *
 * The `order(_updatedAt desc)` is a safety net: nothing in the Studio enforces
 * that only one biographyPage exists, and a bare [0] would pick between duplicates
 * arbitrarily. Most recently edited is at least predictable.
 */
const BIO_QUERY = `*[_type == "biographyPage"] | order(_updatedAt desc) [0]{
  headlineLead,
  headlineAccent,
  portrait,
  alt,
  portraitCaption,
  intro,
  facts[]{ label, value },
  story,
  chapters[]{ _key, label, kicker, title, paragraphs, quote },
  ideologyStatement,
  ideologyInspiration,
  ideologyQuote,
  influences
}`;

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

export default function Biography({
  headline,
  portrait,
  portraitAlt,
  portraitCaption,
  intro,
  facts,
  story,
  chapters,
  ideology,
  influences,
}) {
  console.log(
    "bio props",
    portrait,
    portraitAlt,
    portraitCaption,
    intro,
    facts,
    story,
    chapters,
    ideology,
    influences,
  );
  return (
    <>
      {/* Title */}
      <Box
        as="section"
        maxW="shell"
        mx="auto"
        pt="clamp(2.5rem,6vw,4.5rem)"
        px="gutter"
      >
        <Flex wrap="wrap" align="flex-end" gap="1.75rem clamp(1.5rem,3vw,3rem)">
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
            {headline.lead}{" "}
            <Box as="span" fontStyle="italic" color="amberBright">
              {headline.accent}
            </Box>
          </Heading>
        </Flex>
        <FilmStrip mt="clamp(2.25rem,5vw,3.5rem)" />
      </Box>

      {/* Portrait, lead paragraph, facts and long-form prose */}
      <Box
        as="section"
        maxW="shell"
        mx="auto"
        pt="clamp(2.75rem,6vw,4.5rem)"
        px="gutter"
      >
        <Flex wrap="wrap" gap="clamp(1.75rem,4vw,4rem)" align="flex-start">
          <Box
            as="figure"
            m="0"
            flex="1 1 clamp(17.5rem,28vw,25rem)"
            maxW="25rem"
          >
            {/* The portrait is the page's LCP element, so it preloads rather
                than waiting for layout to discover it. */}
            <PortraitFrame
              src={portrait}
              alt={portraitAlt}
              ratio="4/5"
              priority
            />
            <Box
              as="figcaption"
              mt="3.5"
              textStyle="eyebrow"
              letterSpacing="0.14em"
              color="rgba(247,239,221,0.45)"
            >
              {portraitCaption}
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
              {intro}
            </Text>
            <Flex
              wrap="wrap"
              gap="1.75rem 2.75rem"
              mt="9"
              pt="7"
              borderTop="1px solid"
              borderColor="rgba(139,90,43,0.45)"
            >
              {facts.map((m) => (
                <MetaItem key={`${m.label}-${m.value}`} {...m} />
              ))}
            </Flex>
          </Box>

          <Box
            flex="1 1 100%"
            minW="0"
            css={{ columns: "2 21.25rem", columnGap: "clamp(2rem,4vw,4rem)" }}
          >
            {story.map((p, i) => (
              <Text
                key={`story-${i}`}
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
      <Box
        as="section"
        maxW="shell"
        mx="auto"
        pt="clamp(2.75rem,6vw,4rem)"
        px="gutter"
      >
        {/* Guarded because the chapter list is now editable: an empty one would
            leave defaultValue reading a key off undefined. */}
        {chapters.length > 0 && (
          <Tabs.Root
            defaultValue={chapters[0].key}
            lazyMount
            unmountOnExit={false}
          >
            <Tabs.List display="flex" flexWrap="wrap" gap="3" border="none">
              {chapters.map((s) => (
                <Tabs.Trigger key={s.key} value={s.key} asChild>
                  <Box
                    as="button"
                    type="button"
                    {...triggerStyle(false)}
                    _selected={triggerStyle(true)}
                  >
                    {s.label}
                  </Box>
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            {chapters.map((s) => (
              <Tabs.Content
                key={s.key}
                value={s.key}
                mt="clamp(2.25rem,5vw,3.5rem)"
                p="0"
              >
                {/*
                 * Two columns only when there is a pull quote to fill the left
                 * one. Without it that column is just the heading, which left a
                 * tall empty gutter beside the text on tablet and up — so the
                 * chapter stacks instead and the prose starts under the heading.
                 */}
                <Grid
                  templateColumns={
                    s.quote ? "repeat(auto-fit,minmax(18.75rem,1fr))" : "1fr"
                  }
                  gap="clamp(2rem,4vw,4rem)"
                  alignItems="start"
                >
                  <Box>
                    {s.kicker && (
                      <Eyebrow tone="amber" mb="5">
                        {s.kicker}
                      </Eyebrow>
                    )}
                    {s.title && <SectionHeading>{s.title}</SectionHeading>}
                    {s.quote && (
                      <Box
                        as="blockquote"
                        mt="9"
                        pt="7"
                        borderTop="1px solid"
                        borderColor="rgba(139,90,43,0.5)"
                      >
                        <Box
                          fontFamily="display"
                          fontSize="5xl"
                          lineHeight="0.6"
                          color="bronze"
                        >
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
                        <Box
                          mt="4"
                          textStyle="microLabel"
                          letterSpacing="0.24em"
                          color="bronze"
                        >
                          Ebo Krdum
                        </Box>
                      </Box>
                    )}
                  </Box>

                  {/* Capped once it spans the full row, so the measure stays
                      readable on a wide laptop instead of running edge to edge. */}
                  <Box maxW={s.quote ? undefined : "68ch"}>
                    {s.paras.map((p, i) => (
                      <Text
                        key={`${s.key}-p${i}`}
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
        )}
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
          <Grid
            templateColumns="repeat(auto-fit,minmax(18.75rem,1fr))"
            gap="clamp(2rem,4vw,4rem)"
            alignItems="start"
          >
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
                {ideology.statement}
              </Text>
            </Box>
            <Box>
              <Eyebrow mb="5">Inspirational words</Eyebrow>
              <Text
                m="0"
                fontSize="lg"
                lineHeight="1.8"
                color="rgba(247,239,221,0.78)"
                css={{ textWrap: "pretty" }}
              >
                {ideology.inspiration}
              </Text>
              <Box
                as="blockquote"
                mt="8"
                pt="6"
                borderTop="1px solid"
                borderColor="rgba(139,90,43,0.5)"
              >
                <Text
                  m="0"
                  fontFamily="display"
                  fontStyle="italic"
                  fontSize="lg"
                  lineHeight="1.6"
                  color="rgba(247,239,221,0.88)"
                  css={{ textWrap: "pretty" }}
                >
                  {ideology.quote}
                </Text>
              </Box>
            </Box>
          </Grid>
        </Box>
      </Box>

      {/* Influences */}
      <Box
        as="section"
        maxW="shell"
        mx="auto"
        pt="clamp(3.25rem,7vw,5.5rem)"
        px="gutter"
      >
        <Flex
          wrap="wrap"
          align="flex-end"
          justify="space-between"
          gap="1.25rem 2rem"
        >
          <Heading as="h2" textStyle="sectionSm" m="0" color="cream">
            Influences
          </Heading>
          <Box textStyle="meta" color="rgba(247,239,221,0.5)" maxW="40ch">
            Artists who left an impression on Ebo the kid, and the artist today.
          </Box>
        </Flex>
        <Flex mt="8" wrap="wrap" gap="2.5">
          {influences.map((name, i) => (
            <Box
              key={`${name}-${i}`}
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

/*
 * A CMS string, or the copy bundled with the site. An empty box in the Studio is
 * the artist saying "leave this as it was", not "make this blank".
 */
function text(value, fallback) {
  const t = typeof value === "string" ? value.trim() : "";
  return t || fallback;
}

/*
 * Same idea for a list of paragraphs. Blank boxes are dropped rather than rendered
 * as gaps, and a list that ends up empty falls back wholesale — there is no
 * sensible way to merge half a CMS story with half the bundled one.
 */
function paragraphs(value, fallback) {
  const clean = (Array.isArray(value) ? value : [])
    .map((p) => (typeof p === "string" ? p.trim() : ""))
    .filter(Boolean);
  return clean.length ? clean : fallback;
}

export async function getStaticProps() {
  /*
   * The whole page lives on the `biographyPage` singleton — see the schema for why
   * it is one document rather than the repeated `biography` type.
   *
   * Each field falls back on its own to the copy in @/data/biography, rather than
   * the document falling back as a whole, so the artist can fill the document in
   * over several sittings: the moment he saves an intro, the rest of the page keeps
   * its existing wording instead of emptying out.
   */
  const bio = await cmsFetch(BIO_QUERY, {}, null);

  const facts = (bio?.facts || [])
    .filter((f) => f?.label && f?.value)
    .map((f) => ({ label: f.label.trim(), value: f.value.trim() }));

  const chapters = (bio?.chapters || [])
    .map((c, i) => ({
      /*
       * Sanity gives every item in an array its own `_key`. The tab strip needs a
       * stable, unique string per chapter, and this is one the artist never has to
       * invent or keep unique himself.
       */
      key: c?._key || `chapter-${i}`,
      // Falls back to the heading, so a chapter is never a blank tab button the
      // visitor cannot identify.
      label: text(c?.label, "") || text(c?.title, `Chapter ${i + 1}`),
      kicker: text(c?.kicker, ""),
      title: text(c?.title, ""),
      paras: paragraphs(c?.paragraphs, []),
      quote: text(c?.quote, "") || null,
    }))
    // A chapter with no text would open onto an empty panel, so it is left out of
    // the tabs rather than shown as a dead end.
    .filter((c) => c.paras.length);

  const influences = (bio?.influences || [])
    .map((n) => (typeof n === "string" ? n.trim() : ""))
    .filter(Boolean);

  return {
    props: {
      headline: {
        lead: text(bio?.headlineLead, HEADLINE.lead),
        accent: text(bio?.headlineAccent, HEADLINE.accent),
      },
      portrait: bio?.portrait ? imageUrl(bio.portrait, 900, 82) : null,
      // A generic but accurate default: the previous hardcoded alt described
      // one specific photograph, which would be wrong for whatever the artist
      // uploads. He can write something better in the CMS.
      portraitAlt: text(bio?.alt, "Ebo Krdum"),
      portraitCaption: text(bio?.portraitCaption, PORTRAIT_CAPTION),
      intro: text(bio?.intro, INTRO),
      facts: facts.length ? facts : META,
      story: paragraphs(bio?.story, PROSE),
      chapters: chapters.length ? chapters : SECTIONS,
      ideology: {
        statement: text(bio?.ideologyStatement, IDEOLOGY.statement),
        inspiration: text(bio?.ideologyInspiration, IDEOLOGY.inspiration),
        quote: text(bio?.ideologyQuote, IDEOLOGY.quote),
      },
      influences: influences.length ? influences : INFLUENCES,
    },
    revalidate: 1,
  };
}
