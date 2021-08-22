import { Box, Flex, Text } from "@chakra-ui/layout";
import { VStack } from "@chakra-ui/react";
import Link from "next/link";
//import Section from "../UI/Section";
import Button from "./UI/Button";
/* Component */
import CustomImage from "./UI/CustomImage";
/*
 * the array of percentage({["10%", "40%"]}) represent the  breakpoint for the element start from mobile to lager screen
 * check the link for more details:
 *https://chakra-ui.com/docs/features/responsive-styles
 */

const Hero = () => {
  return (
    <Box
      w="100vw"
      h="auto"
      pt={["4.6rem", "6.2rem"]}
      pb={["1.2rem", "0rem"]}
      bg="linear-gradient(180deg, #C2B552 0%, #795806 100%)"
      align="center"
    >
      <Flex direction={["column", "row"]} w={["100%", "96%", "90%", "80%"]}>
        <CustomImage
          src="/images/ebo-transparent.png"
          alt="This is the main hero image of Ebo Krdums website"
          layout="fill"
          width="100%"
          objectFit="contain"
        />
        <VStack
          //direction="column"
          justify={["flex-start", "flex-end"]}
          spacing={-1}
          align="center"
          my="5%"
          //border="1px blue solid"
        >
          <Box>
            <Text color="brown" fontWeight="bold" fontStyle="italic">
              Latest Album
            </Text>
          </Box>
          <Box>
            <Text
              color="brown"
              fontWeight="bold"
              fontStyle="italic"
              fontSize={["2.8rem", "2.8rem", "3.5rem", "5rem", "6rem"]}
              fontFamily="Brush Script MT"
            >
              Diversity
            </Text>
          </Box>
          <Box>
            <Link href="/album/diversity">
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
