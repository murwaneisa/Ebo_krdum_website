import NextLink from "next/link";
import { Box, Flex, Link } from "@chakra-ui/react";
import Eyebrow from "../common/Eyebrow";
import SectionHeading from "../common/SectionHeading";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/** Nearest show whose date is still in the future, else the most recent past one. */
function pickNextShow(shows = []) {
  const now = Date.now();
  const dated = shows
    .filter((s) => s?.showDate)
    .map((s) => ({ ...s, ts: new Date(s.showDate).getTime() }))
    .filter((s) => !Number.isNaN(s.ts));

  const upcoming = dated.filter((s) => s.ts >= now).sort((a, b) => a.ts - b.ts);
  if (upcoming.length) return upcoming[0];
  return dated.sort((a, b) => b.ts - a.ts)[0] || null;
}

export default function NextShow({ shows = [] }) {
  const show = pickNextShow(shows);

  return (
    <Box
      as="section"
      id="shows"
      maxW="shell"
      mx="auto"
      pt="clamp(3.25rem,7vw,5.5rem)"
      px="gutter"
    >
      <Flex align="flex-end" justify="space-between" gap="6" wrap="wrap">
        <Box>
          <Eyebrow>04 — Upcoming shows</Eyebrow>
          <SectionHeading>On the road</SectionHeading>
        </Box>
        <Link
          asChild
          textStyle="eyebrow"
          letterSpacing="0.12em"
          fontWeight="600"
          color="amber"
          pb="2"
          _hover={{ color: "amberBright" }}
        >
          <NextLink href="/shows">All dates →</NextLink>
        </Link>
      </Flex>

      <Box mt="9" borderTop="1px solid" borderColor="rgba(139,90,43,0.45)">
        {show ? <ShowRow show={show} /> : <EmptyRow />}
      </Box>
    </Box>
  );
}

function ShowRow({ show }) {
  const date = new Date(show.showDate);
  const time = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const place = [show.showCity, show.showCountry].filter(Boolean).join(", ");

  return (
    <Flex
      wrap="wrap"
      align="center"
      gap="1.5rem clamp(1.75rem,4vw,3.5rem)"
      py="7"
      px="1"
      borderBottom="1px solid"
      borderColor="rgba(139,90,43,0.3)"
    >
      <Flex flex="0 0 auto" align="baseline" gap="3.5">
        <Box
          fontFamily="display"
          textStyle="eyebrow"
          letterSpacing="0.22em"
          color="amber"
        >
          {MONTHS[date.getMonth()]}
        </Box>
        <Box
          fontFamily="display"
          fontSize="5xl"
          lineHeight="0.85"
          fontWeight="600"
          color="cream"
        >
          {String(date.getDate()).padStart(2, "0")}
        </Box>
        <Box fontFamily="display" textStyle="body" color="bronze">
          {date.getFullYear()}
        </Box>
      </Flex>

      <Box flex="1 1 18.75rem" minW="0">
        <Box
          fontFamily="display"
          fontSize="2xl"
          fontWeight="500"
          color="cream"
        >
          {show.showTitle}
        </Box>
        {place && (
          <Box mt="2" textStyle="body" color="rgba(247,239,221,0.62)">
            {place}
          </Box>
        )}
      </Box>

      <Box
        flex="0 0 auto"
        fontFamily="mono"
        textStyle="meta"
        letterSpacing="0.06em"
        color="rgba(247,239,221,0.7)"
      >
        {DAYS[date.getDay()]} at {time}
      </Box>

      {show.showBookingLink ? (
        <Link
          href={show.showBookingLink}
          target="_blank"
          rel="noopener noreferrer"
          flex="0 0 auto"
          display="inline-flex"
          alignItems="center"
          textStyle="microLabel"
          letterSpacing="0.14em"
          fontWeight="600"
          color="ink"
          bgColor="amber"
          px="5"
          py="3.5"
          minH="12"
          textDecoration="none"
          // Chakra's Link recipe underlines on hover, which reads wrong on a
          // solid button, so it is turned off explicitly here.
          _hover={{ bgColor: "amberBright", color: "ink", textDecoration: "none" }}
        >
          Tickets →
        </Link>
      ) : (
        <Box
          flex="0 0 auto"
          textStyle="microLabel"
          letterSpacing="0.14em"
          fontWeight="600"
          color="bronze"
          border="1px solid"
          borderColor="rgba(139,90,43,0.6)"
          px="5"
          py="3.5"
          minH="12"
          display="inline-flex"
          alignItems="center"
        >
          Tickets soon
        </Box>
      )}
    </Flex>
  );
}

function EmptyRow() {
  return (
    <Box py="7" px="1" textStyle="body" color="rgba(247,239,221,0.62)">
      New dates are being confirmed — check back soon.
    </Box>
  );
}
