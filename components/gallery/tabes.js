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

const tabes = () => {
	const colors = useColorModeValue(
		["brown", "yellow", "brown"],
		["blue", "teal.900", "brown"]
	);
	const [tabIndex, setTabIndex] = useState(1);
	const bg = colors[tabIndex];
	const style = { color: "white", fontSize: "2.5em" };
	return (
		<Tabs
			px={["1%", "5%", "10%"]}
			variant="enclosed"
			isFitted
			isLazy
			align="center"
			onChange={(index) => setTabIndex(index)}
			bg={bg}
		>
			<TabList>
				<Tab>
					<Stack direction="row" justify="center" align="center">
						<Text>Images</Text>
						<Box>
							<HiOutlinePhotograph style={style} />
						</Box>
					</Stack>
				</Tab>
				<Tab>
					<Stack direction="row" justify="center" align="center">
						<Text>Videos</Text>
						<Box>
							<FiVideo style={style} />
						</Box>
					</Stack>
				</Tab>
			</TabList>
			<TabPanels>
				<TabPanel>The Primary Colors</TabPanel>
				<TabPanel>Are 1, 2, 3</TabPanel>
			</TabPanels>
		</Tabs>
	);
};

export default tabes;
