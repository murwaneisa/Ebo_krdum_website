import { Box, Stack } from "@chakra-ui/react";
import React from "react";
import { Mobile_miniMenu, Desktop_miniMenu } from "./miniMenu";

const MenuItemContainer = ({ isOpen }) => {
	const [show, setShow] = React.useState(false);
	const handleToggle = () => setShow(!show);
	return (
		<Box
			display={{ base: isOpen ? "block" : "none", md: "block" }}
			flexBasis={{ base: "100%", md: "auto" }}
		>
			<Stack
				spacing={[4, 2, 8]}
				align="center"
				justify={["center", "space-between", "flex-end", "flex-end"]}
				direction={["column", "row", "row", "row"]}
				pt={[4, 4, 0, 0]}
				w={["100%", "80%"]}
			>
				{!isOpen ? (
					<Desktop_miniMenu handleToggle={handleToggle} />
				) : (
					<Mobile_miniMenu show={show} handleToggle={handleToggle} />
				)}
			</Stack>
		</Box>
	);
};

export default MenuItemContainer;
