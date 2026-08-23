import { Box } from "@chakra-ui/react";

/*
 * Small uppercase label above section headings, e.g. "02 — Discography".
 * `tone` picks the two colours the design alternates between.
 */
export default function Eyebrow({ children, tone = "bronze", ...rest }) {
  return (
    <Box
      fontSize="11px"
      letterSpacing="0.34em"
      textTransform="uppercase"
      color={tone}
      mb="18px"
      {...rest}
    >
      {children}
    </Box>
  );
}
