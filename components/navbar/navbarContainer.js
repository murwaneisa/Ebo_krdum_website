import { Flex } from "@chakra-ui/react";

const NavbarContainer = ({ children, ...props }) => {
	return (
		<Flex
			position="absolute"
			zIndex={3}
			as="nav"
			align="center"
			justify="space-between"
			wrap="wrap"
			w="100%"
			p={[5, 5, 3, 5, 10, 10]}
			bg={["brown", "brown", "transparent", "transparent"]}
			color="white"
			{...props}
		>
			{children}
		</Flex>
	);
};

export default NavbarContainer;
