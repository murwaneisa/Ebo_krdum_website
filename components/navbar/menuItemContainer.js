import {
	Box,
	Button,
	Collapse,
	Stack,
	Link,
	useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import MenuItem from "./MenuItem";

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
			>
				<MenuItem to="/albums">Home</MenuItem>
				<MenuItem to="/shows">Shows</MenuItem>
				<Link onClick={handleToggle}>Press</Link>
				<Collapse in={show} animateOpacity style={{ marginTop: "0!important" }}>
					<Stack
						mt={2}
						pl={4}
						borderLeft={1}
						borderStyle={"solid"}
						borderColor={useColorModeValue("gray.200", "gray.700")}
						align={"start"}
					>
						<Link>Press</Link>
						<Link>Press</Link>
						<Link>Press</Link>
					</Stack>
				</Collapse>
				<MenuItem to="/biography">Biography</MenuItem>
			</Stack>
		</Box>
	);
};

export default MenuItemContainer;
