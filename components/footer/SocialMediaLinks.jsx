import { ButtonGroup, IconButton } from "@chakra-ui/react";
import * as React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export const SocialMediaLinks = (props) => (
  <ButtonGroup variant="ghost" color="gray.600" {...props}>
    <IconButton
      as="a"
      href="#"
      aria-label="Facebook"
      color="blue.500"
      icon={<FaFacebook fontSize="20px" />}
    />
    <IconButton
      as="a"
      href="#"
      aria-label="Instagram"
      color="green.200"
      icon={<FaInstagram fontSize="20px" />}
    />
    <IconButton
      as="a"
      href="#"
      aria-label="Twitter"
      color="blue.300"
      icon={<FaTwitter fontSize="20px" />}
    />
    <IconButton
      as="a"
      href="#"
      aria-label="YouTube"
      color="red"
      icon={<FaYoutube fontSize="20px" />}
    />
  </ButtonGroup>
);
