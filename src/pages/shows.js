import { Box, Flex, Link } from "@chakra-ui/react";
import { withSiteLayout } from "@/components/layout/SiteLayout";
import Eyebrow from "@/components/common/Eyebrow";
import SectionHeading from "@/components/common/SectionHeading";
import FilmStrip from "@/components/common/FilmStrip";
import ShowRow from "@/components/shows/ShowRow";
import { cmsFetch } from "@/lib/cms";
import { groupByYear, partitionShows } from "@/lib/dates";

function NextShowCard({ show }) {
  if (!show) return null;

  const card = (
    <Box
      position="relative"
      overflow="hidden"
      border="1px solid"
      borderColor="rgba(232,169,58,0.55)"
      bg="surface"
      color="cream"
      minH="clamp(17.5rem,38vw,28.75rem)"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="clamp(1.375rem,3vw,2.5rem)"
      transition="border-color 0.15s ease"
      _hover={{ borderColor: "amberBright" }}
    >
      <Flex wrap="wrap" gap="0.75rem 1rem" align="center">
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
        <Box fontFamily="mono" textStyle="meta" color="rgba(247,239,221,0.85)">
          {show.when}
        </Box>
      </Flex>

      <Flex wrap="wrap" align="flex-end" gap="1.25rem clamp(1.75rem,4vw,4rem)">
        <Flex flex="0 0 auto" align="baseline" gap="3.5">
          <Box fontFamily="display" textStyle="eyebrow" letterSpacing="0.22em" color="amber">
            {show.month}
          </Box>
          <Box fontFamily="display" fontSize="6xl" lineHeight="0.82" fontWeight="600">
            {show.day}
          </Box>
          <Box fontFamily="display" textStyle="body" color="amber">
            {show.year}
          </Box>
        </Flex>

        <Box flex="1 1 18.75rem" minW="0">
          <Box fontFamily="display" fontSize="3xl" fontWeight="500" lineHeight="1.05">
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
    <Link href={show.url} target="_blank" rel="noopener noreferrer" display="block" _hover={{ color: "cream" }}>
      {card}
    </Link>
  );
}

export default function Shows({ upcoming, years, total, firstYear }) {
  const [next, ...rest] = upcoming;

  return (
    <>
      <Box as="section" maxW="shell" mx="auto" pt="clamp(2.5rem,6vw,4rem)" px="gutter">
        <Eyebrow tone="amber">Upcoming</Eyebrow>

        {next ? (
          <>
            <NextShowCard show={next} />
            {rest.length > 0 && (
              <Box mt="7" borderTop="1px solid" borderColor="rgba(139,90,43,0.45)">
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
            New dates are being confirmed — check back soon, or get in touch about booking.
          </Box>
        )}
      </Box>

      <Box as="section" maxW="shell" mx="auto" pt="clamp(3.5rem,7vw,5.5rem)" px="gutter">
        <Flex wrap="wrap" align="flex-end" justify="space-between" gap="1.25rem 2rem">
          <Box>
            <Eyebrow>Archive</Eyebrow>
            <SectionHeading size="sm">Former shows</SectionHeading>
          </Box>
          {total > 0 && (
            <Box textStyle="eyebrow" letterSpacing="0.1em" color="rgba(247,239,221,0.5)" pb="1.5">
              {total} date{total === 1 ? "" : "s"}{firstYear ? ` since ${firstYear}` : ""}
            </Box>
          )}
        </Flex>

        <Box mt="9">
          {years.map((group) => (
            <Box key={group.year} mb="14">
              <Flex align="center" gap="5">
                <Box fontFamily="display" fontSize="4xl" fontWeight="600" color="bronze" lineHeight="1">
                  {group.year}
                </Box>
                <FilmStrip size={12} flex="1 1 auto" />
                <Box fontFamily="mono" fontSize="xs" color="rgba(247,239,221,0.45)">
                  {group.count}
                </Box>
              </Flex>
              <Box mt="5" borderTop="1px solid" borderColor="rgba(139,90,43,0.35)">
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
    []
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
    },
    revalidate: 60 * 30,
  };
}
