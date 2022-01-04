import { Box, HStack, Stack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import MenuItem from "./MenuItem";

const Nav = () => {
	return (
		<Stack
			position="absolute"
			zIndex={3}
			direction={["column", "row"]}
			justify={["center", "space-between"]}
			align="center"
			m="0 auto"
			mb="20px"
			minWidth="100vw"
			p={["4", "6", "8"]}
		>
			<Box pl={["0", "4", "10"]}>
				<Link href="/">
					<a>
						<Image
							src="/images/logo_white.png"
							alt="Ebo Krdum logo"
							height="20"
							width="100"
						/>
					</a>
				</Link>
			</Box>
			<HStack pr={["0", "4", "10"]} spacing={["4", "8", "12"]}>
				<MenuItem to="/">Home</MenuItem>
				<MenuItem to="/albums">Shows</MenuItem>
				<MenuItem to="/shows">Shows</MenuItem>
				<MenuItem to="/Gallery">Gallery</MenuItem>
				<MenuItem to="/biography">Biography</MenuItem>
				<MenuItem to="/blog">blog</MenuItem>
				<MenuItem to="/contacts">Contacts</MenuItem>
			</HStack>
		</Stack>
	);
};

export default Nav;
