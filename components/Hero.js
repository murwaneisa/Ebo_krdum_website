import { Box, Text } from "@chakra-ui/layout";
import Image from "next/image";
import Button from "../UI/Button";

const Hero = () => {
  return (
    <Box
      m="0 auto"
      height="auto"
      width="auto"
      bgColor="yellow"
      align="center"
      justifyItems="end"
      pb="0"
      position="relative"
    >
      <Box position="relative" pb="0" bottom="-1.5">
        <Box position="absolute" right="4" top="5">
          <Text>Orre Tora Tasds</Text>
        </Box>
        <Image
          src="/images/ebo.png"
          objectFit="contain"
          width={500}
          height={500}
          border="2px solid red"
        />

        <Box>
          <Button>View Album</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
