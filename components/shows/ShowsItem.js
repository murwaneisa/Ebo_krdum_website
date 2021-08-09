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
  return (
    <Box py="1rem" w="100vw" px={["1rem", "3rem"]}>
      <Divider mb="2rem" />
      <Flex direction="row" justify="space-between" align="center">
        <VStack w="20%" align="flex-start" spacing="-0.4rem">
          <Text fontSize={["md", "lg", "xl", "2xl"]} letterSpacing="wider">
            SEP
          </Text>
          <Text fontSize={["2xl", "3xl"]} fontWeight="bold">
            30
          </Text>
          <Text fontSize={["sm", "md", "lg", "xl"]}>2021</Text>
        </VStack>
        <Box w="60%" align="center">
          <Text fontSize={["sm", "md", "lg", "xl"]}>Sat - 19:30</Text>
          <Text fontSize={["sm", "md", "lg", "xl"]} fontWeight="bold">
            Snövit The musical
          </Text>
          <Text fontSize={["xs", "sm", "md", "lg"]} noOfLines={2} isTruncated>
            Live Stream - Stockholm
          </Text>
        </Box>
        <Link href="" w="20%" align="end">
          {isLargerThan800 ? (
            <ButtonUi>Buy Ticket</ButtonUi>
          ) : (
            <ButtonUi>&#8594;</ButtonUi>
          )}
        </Link>
      </Flex>
    </Box>
  );
};

export default ShowsItem;
