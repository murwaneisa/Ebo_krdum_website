import { Box } from "@chakra-ui/react";

/* Centred content column: the design's 1360px max width + fluid gutters. */
export default function PageShell({ children, ...rest }) {
  return (
    <Box maxW="shell" mx="auto" px="gutter" {...rest}>
      {children}
    </Box>
  );
}
