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
      pt="clamp(52px,7vw,88px)"
      px="gutter"
    >
      <Flex align="flex-end" justify="space-between" gap="24px" wrap="wrap">
        <Box>
          <Eyebrow>04 — Upcoming shows</Eyebrow>
          <SectionHeading>On the road</SectionHeading>
        </Box>
        <Link
          asChild
          fontSize="13px"
          letterSpacing="0.12em"
          textTransform="uppercase"
          fontWeight="600"
          color="amber"
          pb="8px"
          _hover={{ color: "amberBright" }}
        >
          <NextLink href="/shows">All dates →</NextLink>
        </Link>
      </Flex>

      <Box mt="36px" borderTop="1px solid" borderColor="rgba(139,90,43,0.45)">
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
      gap="24px clamp(28px,4vw,56px)"
      py="28px"
      px="4px"
      borderBottom="1px solid"
      borderColor="rgba(139,90,43,0.3)"
    >
      <Flex flex="0 0 auto" align="baseline" gap="14px">
        <Box
          fontFamily="display"
          fontSize="13px"
          letterSpacing="0.22em"
          textTransform="uppercase"
          color="amber"
        >
          {MONTHS[date.getMonth()]}
        </Box>
        <Box
          fontFamily="display"
          fontSize="clamp(48px,6vw,72px)"
          lineHeight="0.85"
          fontWeight="600"
          color="cream"
        >
          {String(date.getDate()).padStart(2, "0")}
        </Box>
        <Box fontFamily="display" fontSize="15px" color="bronze">
          {date.getFullYear()}
        </Box>
      </Flex>

      <Box flex="1 1 300px" minW="0">
        <Box
          fontFamily="display"
          fontSize="clamp(24px,2.6vw,32px)"
          fontWeight="500"
          color="cream"
        >
          {show.showTitle}
        </Box>
        {place && (
          <Box mt="8px" fontSize="15px" color="rgba(247,239,221,0.62)">
            {place}
          </Box>
        )}
      </Box>

      <Box
        flex="0 0 auto"
        fontFamily="mono"
        fontSize="13px"
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
          fontSize="12px"
          letterSpacing="0.14em"
          textTransform="uppercase"
          fontWeight="600"
          color="ink"
          bgColor="amber"
          px="20px"
          py="13px"
          minH="46px"
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
          fontSize="12px"
          letterSpacing="0.14em"
          textTransform="uppercase"
          fontWeight="600"
          color="bronze"
          border="1px solid"
          borderColor="rgba(139,90,43,0.6)"
          px="20px"
          py="13px"
          minH="46px"
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
    <Box py="28px" px="4px" fontSize="16px" color="rgba(247,239,221,0.62)">
      New dates are being confirmed — check back soon.
    </Box>
  );
}
