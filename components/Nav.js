import { Box, Flex, HStack, Stack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

const Nav = () => {
	return (
		<Stack
			direction={["column", "row"]}
			justify={["center", "space-between"]}
			align="center"
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
			<HStack spacing={["5", "10", "15"]}>
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
		</Stack>
	);
};

export default Nav;
