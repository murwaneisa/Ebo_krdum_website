import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import ButtonUi from "../../UI/Button";
import Image from "../../ui/Image";
import Section from "../../UI/Section";
const AlbumInfoSection = () => {
  return (
    <Section title="Salam" bg="brown" pt="5rem" pb="2rem">
      {/* Album Iamge, date, button */}
      <Stack
        w={["100vw", "80vw", "60vw", "60vw", "55vw"]}
        direction={["column", "column", "column", "row", "row"]}
        spacing={["1rem", "1.2rem", "1.2rem", "0.8rem", "2rem"]}
      >
        {/* Image and button container */}
        <Box>
          {/* Image Box */}
          <Box w={["100vw", "80vw", "60vw", "32vw", "25vw"]}>
            <Image src="/images/salam.jpg" layout="fill" />
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
              Release Year: 2019
            </Text>
            <ButtonUi>Listen on Spotify</ButtonUi>
          </Flex>
        </Box>
        {/* Description Box */}
        <Box px="1rem">
          <Heading>Description</Heading>
          <Text>
            The album Salam contains 5 songs that were released at the same time
            (2019) and one more song ‘Devastation’ which was released via the
            label company Supertraditional in 2020. But all the 6 songs were
            recorded as part of the same project (Memory of War). It was
            recorded in Stockholm, by Ebo’s co-player & producer John Runefelt.
            They were written in (Sudan-Arabi, Juba-Arabi & Daju) with some mix
            of Swedish, French & English, in some songs. All music & Lyrics by :
            Ebo Krdum.
          </Text>
        </Box>
      </Stack>
    </Section>
  );
};

export default AlbumInfoSection;
