import {
  Box,
  Button,
  Collapse,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import ButtonUi from "../UI/Button";
import CustomImage from "../UI/CustomImage";
import Section from "../UI/Section";
const AlbumInfoSection = ({
  title,
  description,
  year,
  image,
  photographer,
  albumSpotify,
}) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  let number = 300;
  console.log(description.length);
  return (
    <Section title={title} bg="brown" pt="6rem" pb="2rem">
      {/* Album Image, date, button */}
      <Stack
        w={["100vw", "80vw", "60vw", "60vw", "55vw"]}
        direction={["column", "column", "column", "row", "row"]}
        spacing={["1rem", "1.2rem", "1.2rem", "0.8rem", "2rem"]}
      >
        {/* Image and button container */}
        <Box>
          {/* Image Box */}
          <Box w={["100vw", "80vw", "60vw", "32vw", "25vw"]}>
            <CustomImage
              src={`/images${image}`}
              alt={`This is Ebo album ${title} image. Photo by: ${photographer}`}
              layout="fill"
            />
          </Box>

          {/* Date and Button Flex Box */}
          <Flex
            direction={["column", "column", "row", "row", "row"]}
            justify="space-between"
            align="center"
            py="0.8rem"
          >
            <Text
              //size={["xs", "sm", "lg", "2xl", "3xl"]}
              fontSize={["1rem", "1rem", "1rem", "1rem", "1rem"]}
              fontWeight="bold"
              mb={["1rem", "1rem", "0rem", "0rem", "0rem"]}
            >
              Release Year: {year}
            </Text>
            {albumSpotify ? (
              <Link href={albumSpotify} isExternal>
                <ButtonUi>Listen on Spotify</ButtonUi>
              </Link>
            ) : (
              <p>Coming Soon on Spotify</p>
            )}
          </Flex>
        </Box>
        {/* Description Box */}
        <Box px="1rem">
          <Heading>Description</Heading>

          <Collapse startingHeight={number} in={show}>
            {description}
          </Collapse>
          {/* Check if the description length is more than 477 characters then show collapse button */}
          {description.length >= 477 ? (
            <Button
              variant="link"
              size="sm"
              onClick={handleToggle}
              color="white"
            >
              Read {show ? "Less" : "More"}
            </Button>
          ) : null}
        </Box>
      </Stack>
    </Section>
  );
};

export default AlbumInfoSection;
