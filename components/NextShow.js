import {
  Box,
  Flex,
  Heading,
  Link as ChakraLink,
  Stack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { BiCalendarCheck, BiLocationPlus, BiTimeFive } from "react-icons/bi";
import { getFullYear, timeFormat } from "../lib/timeFormate";
import showImage from "../public/images/ebo-next-show.jpg";
import classes from "../styles/roundImage.module.css";
import ButtonUi from "./UI/Button";

const NextShow = ({ shows }) => {
  const todaysDate = new Date().toISOString().split("T")[0];

  if (!shows) {
    //return this if there is no show or server error
    return <div>Oppps! internal server Error we will fix it soon </div>;
  }
  function getLatestShow(shows) {
    let latestShow = shows[0];
    let latestDate = new Date(latestShow._updatedAt);

    for (let i = 1; i < shows.length; i++) {
      let currentDate = new Date(shows[i]._updatedAt);

      if (currentDate > latestDate) {
        latestShow = shows[i];
        latestDate = currentDate;
      }
    }

    return latestShow;
  }

  const latestShow = getLatestShow(shows);
  const formattedTime = timeFormat(latestShow.showDate);
  const formattedDate = getFullYear(latestShow.showDate);

  return (
    <Flex
      direction={["column", "column", "row"]}
      bg="yellow"
      w={[
        "95vw",
        "80vw",
        "80vw",
        "3xl",
        "3xl",
      ]} /* fix layout foe the next show and video and reviews  */
      px={["1rem", "1rem", "1rem", "1rem", "2rem"]}
      py={["2rem", "2rem"]}
      align={["center", "center", "center"]}
      justify="space-evenly"
    >
      {/*image section */}
      <Box
        align="center"
        // border="1px white solid"
        className={classes.image}
      >
        {/* placeholder blur require the src has imported image */}
        <Image
          src={showImage}
          placeholder="blur"
          alt="Event image"
          width={400}
          height={400}
          objectFit="cover"
        />
      </Box>
      {/* End of the section */}

      {/* info section */}
      {formattedDate >= todaysDate ? (
        <Stack
          alignItems="center"
          spacing={["2%"]}
          direction="column"
          ml={["0%", "0%", "5%"]}
          mt={["2%", "2%", "0%"]}
          align="center"
        >
          <Heading as="h3" size="xl" pb="1rem">
            {latestShow.showTitle}
          </Heading>
          {/* End of the section */}
          {/* date,time place section */}
          <Stack direction="column" pb="1rem" justify="center">
            <Flex fontSize={["1rem", "1.2rem"]} align="center">
              <BiCalendarCheck />
              <Box pl="0.4rem">{formattedDate}</Box>
            </Flex>

            <Flex fontSize={["1rem", "1.2rem"]} align="center">
              <BiTimeFive />
              <Box pl="0.4rem">{formattedTime}</Box>
            </Flex>
            <Flex fontSize={["1rem", "1.2rem"]} align="center">
              <BiLocationPlus />
              <Box pl="0.4rem">{`${latestShow.showCity}, ${latestShow.showCountry}`}</Box>
            </Flex>
          </Stack>

          {/* End of the section */}
          {/* button and link section */}
          <Stack direction={["column", "row"]}>
            <Box align="center">
              <ChakraLink href={latestShow.showBookingLink} isExternal>
                <ButtonUi>Book tickets</ButtonUi>
              </ChakraLink>
            </Box>
            <Flex color="brown" justify="center" align="center">
              <Link href="/shows">
                <a>See all shows</a>
              </Link>
            </Flex>
          </Stack>
          {/* End of the section */}
        </Stack>
      ) : (
        <Box align="center" w={["80%", "80%", "40%"]}>
          <Heading fontSize={["xl", "xxl", "3xl"]}>Coming soon</Heading>
          <Text mt={["1rem", "2rem"]} fontSize={["sm", "md"]}>
            Currently we are updating the upcoming shows.To view the former
            shows click:
          </Text>
          <Text mt={["1rem", "2rem"]} color="brown">
            <Link href="/shows">
              <a>See all shows</a>
            </Link>
          </Text>
        </Box>
      )}
    </Flex>
  );
};

export default NextShow;
