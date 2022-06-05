import {
	Collapse,
	Link,
	PopoverArrow,
	PopoverBody,
	PopoverContent,
	Portal,
	Popover,
	Stack,
	useColorModeValue,
	PopoverTrigger,
	Box,
	Text,
	Flex,
	Spacer,
	HStack,
} from "@chakra-ui/react";
import React from "react";
import MenuItem from "./MenuItem";
import { HiOutlineDocumentDownload } from "react-icons/hi";

export const Mobile_miniMenu = ({ show, handleToggle }) => {
	return (
		<Box>
			<MenuItem to="/">Home</MenuItem>
			<MenuItem to="/shows">Shows</MenuItem>
			<Link onClick={handleToggle}>
				<Text fontWeight={600}>Press</Text>
			</Link>
			<Collapse in={show} animateOpacity style={{ marginTop: "0!important" }}>
				<Stack
					mt={2}
					pl={4}
					borderLeft={1}
					borderStyle={"solid"}
					borderColor={useColorModeValue("gray.200", "gray.700")}
					align={"start"}
				>
					<a href="public/files/release_En.pdf" target="_blank" download>
						<HStack spacing={"2.4em"} alignItems="center">
							<Text>Release</Text>
							<HiOutlineDocumentDownload />
						</HStack>
					</a>
					<Link>
						<HStack spacing={"1em"} alignItems="center">
							<Text>Stage Map</Text>
							<HiOutlineDocumentDownload />
						</HStack>
					</Link>
					<Link>
						<HStack spacing={"3.4em"} alignItems="center">
							<Text>Press</Text>
							<Box margin-left="auto">
								<HiOutlineDocumentDownload />
							</Box>
						</HStack>
					</Link>
				</Stack>
			</Collapse>
		</Box>
	);
};

export const Desktop_miniMenu = ({ handleToggle }) => {
	return (
		<Popover>
			<MenuItem to="/">Home</MenuItem>
			<MenuItem to="/shows">Shows</MenuItem>
			<Popover>
				<PopoverTrigger>
					<Link onClick={handleToggle}>Press</Link>
				</PopoverTrigger>
				<Portal>
					<PopoverContent>
						<PopoverBody color="red.100">
							<Link>Release</Link>
							<Link>Stage Map</Link>
							<Link>Press</Link>
						</PopoverBody>
					</PopoverContent>
				</Portal>
			</Popover>
			<MenuItem to="/biography">Biography</MenuItem>
		</Popover>
	);
};
