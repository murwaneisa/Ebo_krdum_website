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
			//bg={["primary.500", "primary.500", "red", "transparent"]}
			color={["white", "white", "primary.700", "primary.700"]}
			{...props}
		>
			{children}
		</Flex>
	);
};

export default NavbarContainer;
