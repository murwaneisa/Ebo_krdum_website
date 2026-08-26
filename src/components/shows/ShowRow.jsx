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
      <Flex align="baseline" gap={compact ? "2.5" : "3"} minW={compact ? "7rem" : "8.25rem"}>
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

      <Box flex="1 1 15rem" minW="0" fontFamily="display" fontSize={compact ? "lg" : "xl"} color="cream">
        {show.title}
      </Box>

      <Box flex="0 1 12.5rem" textStyle={compact ? "meta" : "body"} color="rgba(247,239,221,0.62)">
        {show.place}
      </Box>

      {compact ? (
        <Box
          flex="0 0 auto"
          fontFamily="mono"
          fontSize="xs"
          color="rgba(247,239,221,0.38)"
          minW="5.5rem"
          textAlign="right"
        >
          {show.weekday}
        </Box>
      ) : (
        <Box flex="0 0 auto" minW="8.25rem" textAlign="right">
          <Box fontFamily="mono" fontSize="xs" color="rgba(247,239,221,0.55)">
            {show.when}
          </Box>
          {show.url && (
            <Box mt="2" textStyle="microLabel" letterSpacing="0.14em" fontWeight="600" color="amber">
              Tickets →
            </Box>
          )}
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
