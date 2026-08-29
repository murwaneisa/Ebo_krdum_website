import { Box, Flex, Link } from "@chakra-ui/react";

/*
 * One date in a listing. Renders as a link when a booking URL exists, otherwise
 * as a plain row — many archive entries have no ticket link.
 */
export default function ShowRow({ show, compact = false }) {
  const inner = (
    <Flex
      wrap="wrap"
      align="baseline"
      gap="0.5rem 1.5rem"
      py="4"
      px="2"
      borderBottom="1px solid"
      borderColor="rgba(139,90,43,0.28)"
      color="cream"
      transition="background 0.15s ease"
      _hover={show.url ? { bg: "surface" } : undefined}
    >
      <Box flex="0 0 auto" minW={compact ? "7rem" : "8.25rem"}>
        <Flex align="baseline" gap={compact ? "2.5" : "3"}>
          <Box as="span" fontFamily="display" textStyle="microLabel" color="amber">
            {show.month}
          </Box>
          <Box as="span" fontFamily="display" fontSize={compact ? "xl" : "2xl"} fontWeight="600" color="cream">
            {show.day}
          </Box>
          {!compact && (
            <Box as="span" fontFamily="display" textStyle="meta" color="bronze">
              {show.year}
            </Box>
          )}
        </Flex>

        {/* Weekday and time on one line under the date, matching NextShowCard.
            Upcoming rows only — the archive shows the date alone. */}
        {!compact && (
          <Flex
            align="baseline"
            wrap="wrap"
            gap="0.25rem 0.75rem"
            mt="1"
            fontFamily="mono"
            fontSize="xs"
            color="rgba(247,239,221,0.55)"
          >
            <Box as="span">{show.weekday}</Box>
            {show.time && <Box as="span">{show.time}</Box>}
          </Flex>
        )}
      </Box>

      <Box flex="1 1 15rem" minW="0" fontFamily="display" fontSize={compact ? "lg" : "xl"} color="cream">
        {show.title}
      </Box>

      <Box flex="0 1 12.5rem" textStyle={compact ? "meta" : "body"} color="rgba(247,239,221,0.62)">
        {show.place}
      </Box>

      {/* The archive carries no weekday and no ticket link — a past date needs
          neither. Only upcoming rows get the button. */}
      {!compact && show.url && (
        <Box
          flex="0 0 auto"
          /*
           * `ml="auto"` eats the free space before the button, so it stays
           * hard right on whichever wrapped line it lands on — including the
           * single-column stack on a phone, where a plain `textAlign` would
           * leave it sitting under the place name.
           */
          ml="auto"
          textAlign="right"
          textStyle="microLabel"
          letterSpacing="0.14em"
          fontWeight="600"
          color="amber"
        >
          Tickets →
        </Box>
      )}
    </Flex>
  );

  if (!show.url) return inner;

  return (
    <Link
      href={show.url}
      target="_blank"
      rel="noopener noreferrer"
      display="block"
      color="cream"
      _hover={{ color: "cream" }}
    >
      {inner}
    </Link>
  );
}
