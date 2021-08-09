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
import ButtonUi from "../../UI/Button";

const ShowsItem = (props) => {
  const [isLargerThan800] = useMediaQuery("(min-width:800px)");
  const { showInfo, date, isUpcoming } = props;
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
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const dayNr = date.getDate();
  const dayName = dayNames[date.getDay()];
  console.log(dayNr);
  return (
    <Box py="1rem" w="100vw" px={["1rem", "3rem"]}>
      <Divider mb="2rem" />
      <Flex direction="row" justify="space-between" align="center">
        <VStack w="20%" align="flex-start" spacing="-0.4rem">
          <Text fontSize={["md", "lg", "xl", "2xl"]} letterSpacing="wider">
            {month.toUpperCase()}
          </Text>
          <Text fontSize={["2xl", "3xl"]} fontWeight="bold">
            {dayNr}
          </Text>
          <Text fontSize={["sm", "md", "lg", "xl"]}>{year}</Text>
        </VStack>
        <Box w="60%" align="center">
          <Text fontSize={["sm", "md", "lg", "xl"]}>
            {isUpcoming ? dayName + " at " + showInfo.time : dayName}
          </Text>
          <Text fontSize={["sm", "md", "lg", "xl"]} fontWeight="bold">
            {showInfo.sponsor}
          </Text>
          <Text fontSize={["xs", "sm", "md", "lg"]} noOfLines={2} isTruncated>
            {showInfo.location}
          </Text>
        </Box>
        <Link href={showInfo.link} w="20%" align="end">
          {!isLargerThan800 || !isUpcoming ? (
            <ButtonUi>&#8594;</ButtonUi>
          ) : (
            <ButtonUi>Buy Ticket</ButtonUi>
          )}
        </Link>
      </Flex>
    </Box>
  );
};

export default ShowsItem;
