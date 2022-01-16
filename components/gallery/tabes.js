import React, { useState } from "react";
import {
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	useColorModeValue,
	Stack,
	Text,
	Box,
	IconButton,
} from "@chakra-ui/react";
import { HiOutlinePhotograph } from "react-icons/hi";
import { FiVideo } from "react-icons/fi";
import { IconContext } from "react-icons";
import ImageList from "./imageList";

const tabes = ({ gallery }) => {
	/* 	const colors = useColorModeValue(
		["brown", "yellow", "brown"],
		["blue", "teal.900", "brown"]
	); */
	//const [tabIndex, setTabIndex] = useState(1);
	//const bg = colors[tabIndex];
	const style = { color: "white", fontSize: "2em" };
	return (
		<Tabs
			px={["1%", "5%", "10%"]}
			variant="enclosed"
			isFitted
			isLazy
			align="center"
			//onChange={(index) => setTabIndex(index)}
			bg="brown"
			colorScheme="white"
		>
			<TabList>
				<Tab>
					<Stack direction="row" justify="center" align="center" spacing={1}>
						<Text fontWeight="bold">Images</Text>
						<Box>
							<HiOutlinePhotograph style={style} />
						</Box>
					</Stack>
				</Tab>
				<Tab>
					<Stack direction="row" justify="center" align="center">
						<Text fontWeight="bold">Videos</Text>
						<Box>
							<FiVideo style={style} />
						</Box>
					</Stack>
				</Tab>
			</TabList>
			<TabPanels>
				<TabPanel bg="brown">The Primary Colors</TabPanel>
				<TabPanel bg="yellow">Are 1, 2, 3</TabPanel>
			</TabPanels>
		</Tabs>
	);
};

export default tabes;
