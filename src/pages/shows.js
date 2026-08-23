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
      minH="clamp(280px,38vw,460px)"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="clamp(22px,3vw,40px)"
      transition="border-color 0.15s ease"
      _hover={{ borderColor: "amberBright" }}
    >
      <Flex wrap="wrap" gap="12px 16px" align="center">
        <Box
          fontSize="11px"
          letterSpacing="0.24em"
          textTransform="uppercase"
          fontWeight="600"
          color="ink"
          bg="amber"
          px="12px"
          py="7px"
        >
          Next show
        </Box>
        <Box fontFamily="mono" fontSize="13px" color="rgba(247,239,221,0.85)">
          {show.when}
        </Box>
      </Flex>

      <Flex wrap="wrap" align="flex-end" gap="20px clamp(28px,4vw,64px)">
        <Flex flex="0 0 auto" align="baseline" gap="14px">
          <Box fontFamily="display" fontSize="14px" letterSpacing="0.22em" textTransform="uppercase" color="amber">
            {show.month}
          </Box>
          <Box fontFamily="display" fontSize="clamp(60px,8vw,104px)" lineHeight="0.82" fontWeight="600">
            {show.day}
          </Box>
          <Box fontFamily="display" fontSize="16px" color="amber">
            {show.year}
          </Box>
        </Flex>

        <Box flex="1 1 300px" minW="0">
          <Box fontFamily="display" fontSize="clamp(26px,3vw,40px)" fontWeight="500" lineHeight="1.05">
            {show.title}
          </Box>
          {show.place && (
            <Box mt="10px" fontSize="16px" color="rgba(247,239,221,0.78)">
              {show.place}
            </Box>
          )}
        </Box>

        {show.url && (
          <Box
            flex="0 0 auto"
            fontSize="12px"
            letterSpacing="0.14em"
            textTransform="uppercase"
            fontWeight="600"
            color="ink"
            bg="amber"
            px="20px"
            py="13px"
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
      <Box as="section" maxW="shell" mx="auto" pt="clamp(40px,6vw,64px)" px="gutter">
        <Eyebrow tone="amber">Upcoming</Eyebrow>

        {next ? (
          <>
            <NextShowCard show={next} />
            {rest.length > 0 && (
              <Box mt="28px" borderTop="1px solid" borderColor="rgba(139,90,43,0.45)">
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
            p="clamp(24px,3vw,40px)"
            fontSize="17px"
            color="rgba(247,239,221,0.72)"
          >
            New dates are being confirmed — check back soon, or get in touch about booking.
          </Box>
        )}
      </Box>

      <Box as="section" maxW="shell" mx="auto" pt="clamp(56px,7vw,88px)" px="gutter">
        <Flex wrap="wrap" align="flex-end" justify="space-between" gap="20px 32px">
          <Box>
            <Eyebrow>Archive</Eyebrow>
            <SectionHeading size="sm">Former shows</SectionHeading>
          </Box>
          {total > 0 && (
            <Box fontSize="13px" letterSpacing="0.1em" textTransform="uppercase" color="rgba(247,239,221,0.5)" pb="6px">
              {total} date{total === 1 ? "" : "s"}{firstYear ? ` since ${firstYear}` : ""}
            </Box>
          )}
        </Flex>

        <Box mt="36px">
          {years.map((group) => (
            <Box key={group.year} mb="56px">
              <Flex align="center" gap="20px">
                <Box fontFamily="display" fontSize="clamp(34px,4.4vw,60px)" fontWeight="600" color="bronze" lineHeight="1">
                  {group.year}
                </Box>
                <FilmStrip size={12} flex="1 1 auto" />
                <Box fontFamily="mono" fontSize="12px" color="rgba(247,239,221,0.45)">
                  {group.count}
                </Box>
              </Flex>
              <Box mt="20px" borderTop="1px solid" borderColor="rgba(139,90,43,0.35)">
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
