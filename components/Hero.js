import { Box } from "@chakra-ui/layout";
import Image from "next/image";

const Hero = () => {
  return (
    <Box
      border="1px solid red"
      position="relative"
      zIndex="1"
      height="auto"
      width="auto"
    >
      {/* <Box
				border="2px solid blue"
				position="absolute"
				right="0"
				top="5"
				zIndex={2}
			>
				<Box mb={[2, 4, 80]}>
					<Text>Orre Tora Tasds</Text>
				</Box>
				<Box>
					<Button>View Album</Button>
				</Box>
	</Box> */}
      <Box border="1px solid blue" height="80vh" width="100vm">
        <Image
          src="/images/hero-min.jpg"
          objectFit="cover"
          layout="fill"
          quality={100}
        />
      </Box>
    </Box>
  );
};

export default Hero;
