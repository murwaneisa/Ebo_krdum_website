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
      gap="8px 24px"
      py="16px"
      px="8px"
      borderBottom="1px solid"
      borderColor="rgba(139,90,43,0.28)"
      color="cream"
      transition="background 0.15s ease"
      _hover={show.url ? { bg: "surface" } : undefined}
    >
      <Flex align="baseline" gap={compact ? "10px" : "12px"} minW={compact ? "112px" : "132px"}>
        <Box as="span" fontFamily="display" fontSize="12px" letterSpacing="0.2em" textTransform="uppercase" color="amber">
          {show.month}
        </Box>
        <Box as="span" fontFamily="display" fontSize={compact ? "26px" : "30px"} fontWeight="600" color="cream">
          {show.day}
        </Box>
        {!compact && (
          <Box as="span" fontFamily="display" fontSize="14px" color="bronze">
            {show.year}
          </Box>
        )}
      </Flex>

      <Box flex="1 1 240px" minW="0" fontFamily="display" fontSize={compact ? "19px" : "21px"} color="cream">
        {show.title}
      </Box>

      <Box flex="0 1 200px" fontSize={compact ? "14px" : "15px"} color="rgba(247,239,221,0.62)">
        {show.place}
      </Box>

      {compact ? (
        <Box
          flex="0 0 auto"
          fontFamily="mono"
          fontSize="12px"
          color="rgba(247,239,221,0.38)"
          minW="88px"
          textAlign="right"
        >
          {show.weekday}
        </Box>
      ) : (
        <Box flex="0 0 auto" minW="132px" textAlign="right">
          <Box fontFamily="mono" fontSize="12px" color="rgba(247,239,221,0.55)">
            {show.when}
          </Box>
          {show.url && (
            <Box mt="8px" fontSize="11px" letterSpacing="0.14em" textTransform="uppercase" fontWeight="600" color="amber">
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
