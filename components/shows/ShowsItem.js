import {
	Box,
	Divider,
	Flex,
	Link,
	Text,
	useMediaQuery,
	VStack,
} from "@chakra-ui/react";
import React from "react";
import ButtonUi from "../UI/Button";
import { TimeFormat, dayFormat } from "../../lib/timeFormate";

const ShowsItem = (props) => {
	const [isLargerThan800] = useMediaQuery("(min-width:800px)");
	const { showInfo, date, isUpcoming } = props;
	const formattedTime = TimeFormat(showInfo.showDate);
	var dayNames = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const monthNames = [
		"JAN",
		"FEB",
		"MAR",
		"APR",
		"MAY",
		"JUN",
		"JUL",
		"AUG",
		"SEP",
		"OCT",
		"NOV",
		"DEC",
	];
	const month = monthNames[date.getMonth()];
	const year = date.getFullYear();
	const dayNr = dayFormat(date);
	const dayName = dayNames[date.getDay()];

	return (
		<Box py="1rem" w="100vw" px={["5%", "8%", "10%", "20%"]}>
			<Divider mb="2rem" />
			<Flex direction="row" justify="space-between" align="center">
				<VStack w="20%" align="flex-start" spacing="-0.4rem">
					<Text fontSize={["md", "lg", "xl", "2xl"]} letterSpacing="wider">
						{month}
					</Text>
					<Text fontSize={["2xl", "3xl"]} fontWeight="bold">
						{dayNr}
					</Text>
					<Text fontSize={["sm", "md", "lg", "xl"]}>{year}</Text>
				</VStack>
				<Box w="60%" align="center">
					<Text fontSize={["sm", "md", "lg", "xl"]}>
						{isUpcoming ? dayName + " at " + formattedTime : dayName}
					</Text>
					<Text fontSize={["sm", "md", "lg", "xl"]} fontWeight="bold">
						{showInfo.showTitle}
					</Text>
					<Text fontSize={["xs", "sm", "md", "lg"]} noOfLines={2} isTruncated>
						{`${showInfo.showCity}, ${showInfo.showCountry}`}
					</Text>
				</Box>
				<Link href={showInfo.showBookingLink} w="20%" align="end" isExternal>
					{!isLargerThan800 ? (
						<ButtonUi>&#8594;</ButtonUi>
					) : isUpcoming ? (
						<ButtonUi>Buy Ticket</ButtonUi>
					) : (
						<a>Discover</a>
					)}
				</Link>
			</Flex>
		</Box>
	);
};

export default ShowsItem;
