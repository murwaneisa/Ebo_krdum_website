import { Box, Flex, Text } from "@chakra-ui/layout";
import { VStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import Button from "./UI/Button";
import { imageCDN } from "../lib/imageCdnFn";
/*
 * the array of percentage({["10%", "40%"]}) represent the  breakpoint for the element start from mobile to lager screen
 * check the link for more details:
 *https://chakra-ui.com/docs/features/responsive-styles
 * add blur from Next js check ou :https://github.com/vercel/next.js/blob/canary/examples/image-component/pages/placeholder.js
 */

const Hero = ({ heroImage, album }) => {
  const image = imageCDN(heroImage);
  return (
    <Box
      w="100vw"
      h={["78vh", "90vh"]}
      bg="linear-gradient(180deg, #A53100 0%, #882900 100%)"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        direction={["column", "column", , "row", "row"]}
        w={["100%", "96%", "90%", "80%"]}
        align="center"
      >
        <Box
          position="relative"
          w={["100vw", "100vw", "100vw", "40vw", "40vw"]}
          h={["40vh", "45vh", "43vh", "43vh", "70vh"]}
          overflow="hidden"
          mr={["0px", "0px", "0px", "20px", "30px"]}
          mb={["40px", "40px", "40px", "0px"]}
        >
          <Image
            src={image}
            alt={image.alt}
            layout="fill"
            objectFit="contain"
          />
        </Box>
        <VStack
          justify="center"
          spacing={-1}
          align="center"
          w={["100%", "100%", "100%", "50%"]}
        >
          <Box>
            <Text color="yellow" fontWeight="bold" fontStyle="italic">
              Latest Album
            </Text>
          </Box>
          <Box>
            <Text
              color="yellow"
              fontWeight="bold"
              fontStyle="italic"
              fontSize={["2.8rem", "2.8rem", "3.5rem", "4.6rem", "5.5rem"]}
              fontFamily="Alex Brush, cursive"
            >
              {album.albumTitle}
            </Text>
          </Box>
          <Box>
            <Link href={`/album/${album.albumSlug.current}`}>
              <a>
                <Button>View Album</Button>
              </a>
            </Link>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Hero;
