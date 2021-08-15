import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { BiCalendarCheck, BiLocationPlus, BiTimeFive } from "react-icons/bi";
import ButtonUi from "./UI/Button";

const NextShow = () => {
  return (
    <Box w="100vw" align="center" justify="center">
      <Stack
        bg="yellow"
        p={["10%", "5%"]}
        mx={["5%", "10%", "20%"]}
        mb={["2rem", "6rem"]}
        spacing="20px"
      >
        <Heading as="h3" size="xl" pb="1rem">
          FASCHING
        </Heading>
        <Stack
          justify="center"
          spacing={["2%", "10%", "15%"]}
          direction={["column", "row"]}
        >
          <Flex
            fontSize={["1rem", "1.2rem"]}
            align="center"
            justify={["center", "center"]}
          >
            <BiCalendarCheck />
            <Box pl="0.4rem">2021-SPE-30</Box>
          </Flex>

          <Flex fontSize={["1rem", "1.2rem"]} align="center" justify="center">
            <BiTimeFive />
            <Box pl="0.4rem">20:00</Box>
          </Flex>
        </Stack>
        <Flex
          fontSize={["1rem", "1.2rem"]}
          align="center"
          justify={["center", "center"]}
        >
          <BiLocationPlus />

          <Box pl={["0rem", "0.4rem", "0.4rem"]}>Kungsgatan 63 , Stockholm</Box>
        </Flex>
        <ButtonUi>Book tickets</ButtonUi>
        <Box justify="center" align="center">
          <Link
            /* change the link */
            href="/shows"
            color="brown"
          >
            <a>See all shows</a>
          </Link>
        </Box>
      </Stack>
    </Box>
  );
};

export default NextShow;
