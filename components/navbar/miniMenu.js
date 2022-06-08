import {
	Collapse,
	PopoverBody,
	PopoverContent,
	Portal,
	Popover,
	Stack,
	useColorModeValue,
	PopoverTrigger,
	Box,
	Text,
	HStack,
	Link,
	VStack,
} from "@chakra-ui/react";
import React from "react";
import MenuItem from "./MenuItem";
import { HiOutlineDocumentDownload } from "react-icons/hi";

export const Mobile_miniMenu = ({ show, handleToggle }) => {
	return (
		<VStack>
			<MenuItem to="/">Home</MenuItem>
			<MenuItem to="/shows">Shows</MenuItem>
			<MenuItem to="/biography">Biography</MenuItem>
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
					<a href="files/release_En.pdf" rel="noreferrer">
						<HStack spacing={"2.6em"} alignItems="center">
							<Text>Release</Text>
							<HiOutlineDocumentDownload />
						</HStack>
					</a>
					<a href="files/stage_plots.pdf" rel="noreferrer">
						<HStack spacing={"1em"} alignItems="center">
							<Text>Stage Plots</Text>
							<HiOutlineDocumentDownload />
						</HStack>
					</a>
					<a href="files/press.pdf" rel="noreferrer">
						<HStack spacing={"3.6em"} alignItems="center">
							<Text>Press</Text>
							<Box>
								<HiOutlineDocumentDownload />
							</Box>
						</HStack>
					</a>
				</Stack>
			</Collapse>
		</VStack>
	);
};

export const Desktop_miniMenu = ({ handleToggle }) => {
	return (
		<Popover>
			<MenuItem to="/">Home</MenuItem>
			<MenuItem to="/shows">Shows</MenuItem>
			<Popover trigger={"hover"}>
				<PopoverTrigger>
					<Link onClick={handleToggle}>
						<Text fontWeight={600}>Press</Text>
					</Link>
				</PopoverTrigger>
				<Portal>
					<PopoverContent bg="brown" border={0} boxShadow={"xl"}>
						<PopoverBody color="white" justifyItems={"center"}>
							<a href="files/release_En.pdf" rel="noreferrer" target="_blank">
								<HStack
									spacing={"3.8em"}
									alignItems="center"
									cursor="pointer"
									pl="2rem"
								>
									<Text fontSize={"lg"}>Release</Text>
									<HiOutlineDocumentDownload />
								</HStack>
							</a>
							<a href="files/stage_plots.pdf" rel="noreferrer" target="_blank">
								<HStack spacing={"2em"} alignItems="center" pl="2rem">
									<Text fontSize={"lg"}>Stage Plots</Text>
									<HiOutlineDocumentDownload />
								</HStack>
							</a>
							<a href="files/press.pdf" rel="noreferrer" target="_blank">
								<HStack spacing={"5em"} alignItems="center" pl="2rem">
									<Text fontSize={"lg"}>Press</Text>
									<Box margin-left="auto">
										<HiOutlineDocumentDownload />
									</Box>
								</HStack>
							</a>
						</PopoverBody>
					</PopoverContent>
				</Portal>
			</Popover>
			<MenuItem to="/biography">Biography</MenuItem>
		</Popover>
	);
};
