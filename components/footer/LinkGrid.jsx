import { Box, Link, SimpleGrid, Stack } from "@chakra-ui/react";
import * as React from "react";
import { FooterHeading } from "./FooterHeading";

export const LinkGrid = (props) => (
  <SimpleGrid columns={2} {...props}>
    <Box minW="130px">
      <FooterHeading mb="4">Ebos</FooterHeading>
      <Stack>
        <Link href="/biography">Biography</Link>
        <Link href="/shows">Shows</Link>
      </Stack>
    </Box>
    <Box minW="130px">
      <FooterHeading mb="4">Albums</FooterHeading>
      <Stack>
        <Link href="/album/anasna">Anasna</Link>
        <Link href="/album/salam">Salam</Link>
        <Link href="/album/diversity">Diversity</Link>
      </Stack>
    </Box>
  </SimpleGrid>
);
