import { Box, Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import Image from "next/image";
import Button from "../UI/Button";

const Hero = () => {
	return (
		<Box
			border="1px solid red"
			position="relative"
			zIndex="1"
			height="70vh"
			width="100vm"
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
			<Box border="1px solid blue" position="absolute">
				<Image
					src="/images/hero.jpg"
					objectFit="cover"
					layout="fill"
					quality={100}
				/>
			</Box>
		</Box>
	);
};

export default Hero;
