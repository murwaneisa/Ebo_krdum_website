/* Components */

import { AspectRatio, Box, HStack, Link, Stack } from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";
/* Components */
import Hero from "../components/Hero";
import NextShow from "../components/NextShow";
import Reviews from "../components/Reviews";
import data from "../public/locale/en/albums.js";
import AlbumCard from "../UI/AlbumCard";
import Section from "../UI/Section";

export default function Home(props) {
  return (
    <div>
      {/* Hero image */}
      <Hero />
      {/* Other albums */}
      <Section
        bg="brown"
        px={["2rem", "2rem", "3rem", "6.2rem"]}
        py="2rem"
        title="Albums"
      >
        <Box>
          <Stack
            direction={["column", "column", "row"]}
            spacing={["5%", "1%", "1%", "3%"]}
            align="center"
          >
            {data.map((album) => (
              <AlbumCard
                key={album.id}
                id={album.id}
                year={album.year}
                image={album.image}
                title={album.title}
              />
            ))}
          </Stack>
        </Box>
      </Section>

      {/* Video */}
      <Section bg="yellow" title="Videos" py="2rem">
        <Box>
          <Box
            mb="1rem"
            minW={["100vw", "95vw", "85vw", "70vw", "60vw"]}
            align="center"
          >
            {/* Fix AspectRatio issue with Flex children see: https://github.com/chakra-ui/chakra-ui/issues/2582 */}
            <AspectRatio
              maxW="95%"
              ratio={4 / 3}
              border="0.4rem solid"
              borderColor="brown"
            >
              <iframe
                title="Ebo and Genuine Mezziga"
                src="https://www.youtube.com/embed/STMH9IAcvaU"
                allowFullScreen
              />
            </AspectRatio>
          </Box>
          <HStack spacing="0.4rem" justify="center" align="center">
            <Link
              href="https://www.youtube.com/channel/UCtQCeThNAGW_5MSRdFYX2bQ"
              isExternal
              color="brown"
            >
              See all videos
            </Link>
            <Link
              href="https://www.youtube.com/channel/UCtQCeThNAGW_5MSRdFYX2bQ"
              isExternal
              color="brown"
            >
              <FaExternalLinkAlt fontSize="1rem" />
            </Link>
          </HStack>
        </Box>
      </Section>

      {/*  Next Show */}
      <Section bg="brown" title="Next Show" py="2rem">
        <NextShow />
      </Section>

      {/* Review */}
      <Section bg="yellow" pt="2rem" pb="5rem" px="0%" title="Reviews">
        <Box align="center">
          <Reviews />
        </Box>
      </Section>
    </div>
  );
}
