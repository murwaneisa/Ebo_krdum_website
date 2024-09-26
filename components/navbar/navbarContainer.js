import { Flex } from "@chakra-ui/react";

const NavbarContainer = ({ children, ...props }) => {
  return (
    <Flex
      zIndex={3}
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={8}
      bg={"brown"}
      color="white"
      {...props}
    >
      {children}
    </Flex>
  );
};

export default NavbarContainer;
