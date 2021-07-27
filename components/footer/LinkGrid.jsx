import { Box, Link, SimpleGrid, Stack } from "@chakra-ui/react";
import * as React from "react";
import { FooterHeading } from "./FooterHeading";

export const LinkGrid = (props) => (
  <SimpleGrid columns={2} {...props}>
    <Box minW="130px">
      <FooterHeading mb="4">Ebos</FooterHeading>
      <Stack>
        <Link>Biography</Link>
        <Link>Videos</Link>
        <Link>Reviews</Link>
        <Link>Shows</Link>
      </Stack>
    </Box>
    <Box minW="130px">
      <FooterHeading mb="4">Albums</FooterHeading>
      <Stack>
        <Link>Anasna</Link>
        <Link>Salam</Link>
        <Link>Diversity</Link>
      </Stack>
    </Box>
  </SimpleGrid>
);
