import { Box, Stack } from "@chakra-ui/react";
import React from "react";
import MenuItem from "./MenuItem";

const MenuItemContainer = ({ isOpen }) => {
	return (
		<Box
			display={{ base: isOpen ? "block" : "none", md: "block" }}
			flexBasis={{ base: "100%", md: "auto" }}
		>
			<Stack
				spacing={[8, 2, 8]}
				align="center"
				justify={["center", "space-between", "flex-end", "flex-end"]}
				direction={["column", "row", "row", "row"]}
				pt={[4, 4, 0, 0]}
			>
				<MenuItem to="/albums">Albums</MenuItem>
				<MenuItem to="/shows">Shows</MenuItem>
				<MenuItem to="/Gallery">Gallery</MenuItem>
				<MenuItem to="/biography">Biography</MenuItem>
				<MenuItem to="/blog">blog</MenuItem>
				<MenuItem to="/contacts">Contacts</MenuItem>
			</Stack>
		</Box>
	);
};

export default MenuItemContainer;
