import { Box } from "@chakra-ui/react";

/*
 * Small uppercase label above section headings, e.g. "02 — Discography".
 * `tone` picks the two colours the design alternates between.
 */
export default function Eyebrow({ children, tone = "bronze", ...rest }) {
  return (
    <Box
      textStyle="microLabel"
      letterSpacing="0.34em"
      color={tone}
      mb="4.5"
      {...rest}
    >
      {children}
    </Box>
  );
}
