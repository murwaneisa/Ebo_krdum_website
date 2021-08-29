import { Box, Stack, Text } from "@chakra-ui/react";
import * as React from "react";
import { FooterHeading } from "./FooterHeading";

export const ContactBox = (props) => {
  return (
    <Box>
      <Stack spacing="4">
        <FooterHeading>Contacts</FooterHeading>
        <Text>
          Booking & Management:
          <br />
          Supertraditional - Erik Rask
          <br />
          <a href="tel:+46725126862">+46 725 12 68 62</a>
          <br />
          <a href="mailto:booking@supertraditional.com">
            booking@supertraditional.com
          </a>
        </Text>
        <Text>
          Interviews and Shows:
          <br />
          <a href="tel:+46737401711">+46 737 40 17 11</a>
        </Text>
      </Stack>
    </Box>
  );
};
