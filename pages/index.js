/* Components */

import { AspectRatio, Box, HStack, Link, Stack } from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";
/* Components */
import Hero from "../components/Hero";
import HomePageReview from "../components/HomePageReview";
import NextShow from "../components/NextShow";
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
            spacing={["0rem", "1rem"]}
            align="center"
          >
            {data.map((album) => (
              <AlbumCard
                key={album.id}
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
            <AspectRatio maxW="95%" ratio={4 / 3} border="0.4rem solid brown">
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
      <Section bg="brown" title="Next Show">
        <NextShow />
      </Section>
      {/* Review */}
      <Section
        shildDrection="column"
        bg="yellow"
        py="10%"
        px="5%"
        title="Reviews"
      >
        <Box align="center">
          <Stack
            direction={["column", "row"]}
            spacing={["1rem", "2rem", "4rem"]}
          >
            <HomePageReview
              logoWidth="20%"
              image="svt.png"
              name="Svt nyheter"
              text=" För tio år sedan flydde artisten Ebo Krdum från kriget i sudanesiska Darfur till Sverige. Här föll han pladask för både fiol och cello och nu är han aktuell med en blandning av afrikansk blues, afro beat och skandinavisk folkmusik."
            />
            <HomePageReview
              logoWidth="70%"
              image="sverigesRadio4.png"
              name="Sveriges Radio"
              text="Avsnittet inleds dock med nya singeln Revolution Call med Ebo Krdum som flydde från Darfur i västra Sudan och nu är bosatt i Sverige. (En intervju med Ebo Krdum kommer senare i vår)."
            />
          </Stack>
          <Box mt="4rem">
            <Link
              href="https://www.youtube.com/channel/UCtQCeThNAGW_5MSRdFYX2bQ"
              isExternal
              color="brown"
            >
              See all Reviews
            </Link>
          </Box>
        </Box>
      </Section>
    </div>
  );
}
