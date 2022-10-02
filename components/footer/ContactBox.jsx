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
          <a href="mailto:booking@ebokrdum.com">management@ebokrdum.com</a>
        </Text>
        <Text>
          Interviews and Shows:
          <br />
          <a href="mailto:info@ebokrdum.com">info@ebokrdum.com</a>
          <br />
          <a href="tel:+46737401711">+46 737 40 17 11</a>
        </Text>
      </Stack>
    </Box>
  );
};
