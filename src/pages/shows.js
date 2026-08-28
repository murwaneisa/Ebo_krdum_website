import Image from "next/image";
import { Box, Flex, Link } from "@chakra-ui/react";
import { withSiteLayout } from "@/components/layout/SiteLayout";
import Eyebrow from "@/components/common/Eyebrow";
import SectionHeading from "@/components/common/SectionHeading";
import FilmStrip from "@/components/common/FilmStrip";
import ShowRow from "@/components/shows/ShowRow";
import { cmsFetch, imageUrl } from "@/lib/cms";
import { groupByYear, partitionShows } from "@/lib/dates";

/*
 * Darkens the photo behind the card so the cream type stays legible. Heavier at
 * the top and bottom, where the "Next show" badge and the date sit, and lighter
 * through the middle so the image still reads as a photo.
 */
const CARD_SCRIM =
  "linear-gradient(180deg,rgba(36,26,16,0.82) 0%,rgba(36,26,16,0.52) 42%,rgba(36,26,16,0.88) 100%)";

/*
 * `image` is the shows section's standing image, held in the `showsSection`
 * singleton rather than on any individual show, so it survives dates coming and
 * going. Optional in the CMS: without it the card keeps its `surface` fill and
 * looks exactly as it did before.
 */
function NextShowCard({ show, image = null, imageAlt = "" }) {
  if (!show) return null;

  const card = (
    <Box
      position="relative"
      overflow="hidden"
      border="1px solid"
      borderColor="rgba(232,169,58,0.55)"
      bg="surface"
      color="cream"
      /*
       * On narrow screens the `38vw` term collapses and the clamp floors out,
       * leaving a card too short for the stacked content — the text then fills
       * it edge to edge and hides the photo. Small screens get an explicit
       * taller card instead, which also suits a portrait crop better.
       */
      minH={{ base: "28rem", sm: "30rem", md: "clamp(20rem,38vw,28.75rem)" }}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      // Guarantees breathing room between the two rows even when the content
      // grows past the minimum height.
      gap="clamp(1.75rem,5vw,3rem)"
      p="clamp(1.375rem,3vw,2.5rem)"
      transition="border-color 0.15s ease"
      _hover={{ borderColor: "amberBright" }}
    >
      {image && (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            // The card sits at the top of the page, so this is the LCP element:
            // preload it rather than letting the default lazy-loading delay the
            // download until after layout.
            priority
            sizes="(min-width: 85rem) 1360px, 100vw"
            style={{ objectFit: "cover" }}
          />
          <Box position="absolute" inset="0" background={CARD_SCRIM} />
        </>
      )}

      <Flex position="relative" wrap="wrap" gap="0.75rem 1rem" align="center">
        <Box
          textStyle="microLabel"
          letterSpacing="0.24em"
          fontWeight="600"
          color="ink"
          bg="amber"
          px="3"
          py="2"
        >
          Next show
        </Box>
      </Flex>

      <Flex
        position="relative"
        wrap="wrap"
        align="flex-end"
        gap="1.25rem clamp(1.75rem,4vw,4rem)"
      >
        <Box flex="0 0 auto" maxW="100%">
          {/*
            * Both values need units: Chakra only resolves a spacing token when
            * the prop is a single token ("3.5"), and passes a multi-value
            * string through raw. A bare `3.5` would invalidate the whole
            * shorthand. 0.875rem is Chakra's `3.5`.
            */}
          <Flex align="baseline" wrap="wrap" gap="0.5rem 0.875rem">
            <Box
              fontFamily="display"
              textStyle="eyebrow"
              letterSpacing="0.22em"
              color="amber"
            >
              {show.month}
            </Box>
            <Box
              fontFamily="display"
              fontSize="6xl"
              lineHeight="0.82"
              fontWeight="600"
            >
              {show.day}
            </Box>
            <Box fontFamily="display" textStyle="body" color="amber">
              {show.year}
            </Box>
          </Flex>

          {/* Weekday and time share one line, sitting under the date above. */}
          <Flex align="baseline" wrap="wrap" gap="0.5rem 1rem" mt="2">
            <Box
              fontFamily="display"
              textStyle="body"
              color="rgba(247,239,221,0.85)"
            >
              {show.weekday}
            </Box>
            {show.time && (
              <Box
                fontFamily="mono"
                textStyle="meta"
                color="rgba(247,239,221,0.85)"
              >
                {show.time}
              </Box>
            )}
          </Flex>
        </Box>

        <Box flex="1 1 18.75rem" minW="0">
          <Box
            fontFamily="display"
            fontSize="3xl"
            fontWeight="500"
            lineHeight="1.05"
          >
            {show.title}
          </Box>

          {show.place && (
            <Box mt="2.5" textStyle="body" color="rgba(247,239,221,0.78)">
              {show.place}
            </Box>
          )}
        </Box>

        {show.url && (
          <Box
            flex="0 0 auto"
            textStyle="microLabel"
            letterSpacing="0.14em"
            fontWeight="600"
            color="ink"
            bg="amber"
            px="5"
            py="3.5"
          >
            Tickets →
          </Box>
        )}
      </Flex>
    </Box>
  );

  if (!show.url) return card;
  return (
    <Link
      href={show.url}
      target="_blank"
      rel="noopener noreferrer"
      display="block"
      _hover={{ color: "cream" }}
    >
      {card}
    </Link>
  );
}

export default function Shows({
  upcoming,
  years,
  total,
  firstYear,
  nextShowImage,
  nextShowImageAlt,
}) {
  const [next, ...rest] = upcoming;

  return (
    <>
      <Box
        as="section"
        maxW="shell"
        mx="auto"
        pt="clamp(2.5rem,6vw,4rem)"
        px="gutter"
      >
        <Eyebrow tone="amber">Upcoming</Eyebrow>

        {next ? (
          <>
            <NextShowCard
              show={next}
              image={nextShowImage}
              imageAlt={nextShowImageAlt}
            />
            {rest.length > 0 && (
              <Box
                mt="7"
                borderTop="1px solid"
                borderColor="rgba(139,90,43,0.45)"
              >
                {rest.map((s) => (
                  <ShowRow key={s.id} show={s} />
                ))}
              </Box>
            )}
          </>
        ) : (
          <Box
            border="1px solid"
            borderColor="rgba(139,90,43,0.45)"
            bg="surface"
            p="clamp(1.5rem,3vw,2.5rem)"
            textStyle="lead"
            color="rgba(247,239,221,0.72)"
          >
            New dates are being confirmed — check back soon, or get in touch
            about booking.
          </Box>
        )}
      </Box>

      <Box
        as="section"
        maxW="shell"
        mx="auto"
        pt="clamp(3.5rem,7vw,5.5rem)"
        px="gutter"
      >
        <Flex
          wrap="wrap"
          align="flex-end"
          justify="space-between"
          gap="1.25rem 2rem"
        >
          <Box>
            <Eyebrow>Archive</Eyebrow>
            <SectionHeading size="sm">Former shows</SectionHeading>
          </Box>
          {total > 0 && (
            <Box
              textStyle="eyebrow"
              letterSpacing="0.1em"
              color="rgba(247,239,221,0.5)"
              pb="1.5"
            >
              {total} date{total === 1 ? "" : "s"}
              {firstYear ? ` since ${firstYear}` : ""}
            </Box>
          )}
        </Flex>

        <Box mt="9">
          {years.map((group) => (
            <Box key={group.year} mb="14">
              <Flex align="center" gap="5">
                <Box
                  fontFamily="display"
                  fontSize="4xl"
                  fontWeight="600"
                  color="bronze"
                  lineHeight="1"
                >
                  {group.year}
                </Box>
                <FilmStrip size={12} flex="1 1 auto" />
                <Box
                  fontFamily="mono"
                  fontSize="xs"
                  color="rgba(247,239,221,0.45)"
                >
                  {group.count}
                </Box>
              </Flex>
              <Box
                mt="5"
                borderTop="1px solid"
                borderColor="rgba(139,90,43,0.35)"
              >
                {group.shows.map((s) => (
                  <ShowRow key={s.id} show={s} compact />
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        <FilmStrip />
      </Box>
    </>
  );
}

Shows.getLayout = withSiteLayout({
  title: "Shows",
  description: "Upcoming concerts and the full touring archive for Ebo Krdum.",
});

export async function getStaticProps() {
  const raw = await cmsFetch(
    `*[_type == "show"]{ _id, showTitle, showDate, showCity, showCountry, showBookingLink }`,
    {},
    [],
  );

  const showsSection = await cmsFetch(
    `*[_type == "showsSection"][0]{ sectionImage, alt }`,
    {},
    null,
  );

  // Formatting happens here, at build time, so server and client never disagree
  // about the viewer's timezone.
  const { upcoming, past, total } = partitionShows(raw || []);
  const years = groupByYear(past);

  return {
    props: {
      upcoming,
      years,
      total,
      firstYear: years.length ? years[years.length - 1].year : null,
      nextShowImage: showsSection?.sectionImage
        ? imageUrl(showsSection.sectionImage, 1700, 82)
        : null,
      nextShowImageAlt: showsSection?.alt || "",
    },
    revalidate: 60 * 30,
  };
}
