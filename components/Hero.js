import { Box, Flex, Text } from "@chakra-ui/layout";
import Link from "next/link";
//import Section from "../UI/Section";
import Button from "../UI/Button";
/* Component */
import CustomImage from "../UI/CustomImage.js";
/*
 * the array of percentage({["10%", "40%"]}) represent the  breakpoint for the element start from mobile to lager screen
 * check the link for more details:
 *https://chakra-ui.com/docs/features/responsive-styles
 */

const Hero = () => {
  return (
    <Box
      w="100%"
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
        <Flex
          direction="column"
          justify={["flex-start", "center"]}
          align="center"
        >
          <Box>
            <Text
              color="brown"
              fontWeight="bold"
              fontStyle="italic"
              fontSize={["3.8rem", "4.4rem", "6.4rem", "7rem", "8.4rem"]}
              fontFamily="Brush Script MT"
            >
              Diversity
            </Text>
          </Box>
          <Box>
            <Link href="/album/diversity">
              <a>
                <Button>View latest Album</Button>
              </a>
            </Link>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Hero;
