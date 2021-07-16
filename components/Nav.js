import { Box, Flex, HStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  return (
    <Flex
      justify="space-between"
      m="0 auto"
      maxWidth="1150px"
      p="2"
      backgroundColor="yellow"
    >
      <Box>
        <Link href="/">
          <Image src="/images/logo_white.png" height="20" width="100" />
        </Link>
      </Box>
      <HStack spacing="5">
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/biography">
          <a>Biography</a>
        </Link>
        <Link href="/shows">
          <a>Shows</a>
        </Link>
      </HStack>
    </Flex>
  );
};

export default Nav;
