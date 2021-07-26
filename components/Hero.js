import { Box, Text } from "@chakra-ui/layout";
import Image from "next/image";
import Button from "../UI/Button";

const Hero = () => {
	return (
		<Box
			//m="0 auto"
			height="auto"
			width="auto"
			bgColor="yellow"
			align="center"
			justifyItems="end"
			border="1px solid black"
			position="relative"
		>
			<Box
				/* 	position="absolute"
				top="50%"
				left="50%"
				transform="translate(-60%, -50%)" */
				//pb="0"
				//bottom="-1.5"
				border="1px solid red"
				//width={["100%", "50%", "25%", "15%"]}
				//w={["xs", "sm", "md", "lg"]}
				//width="70%"
				maxWidth="100vw"
				height="100vh"
			>
				<Box
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
				</Box>
				<Image
					src="/images/hero.jpg"
					objectFit="cover"
					//width={700}
					//height={800}
					layout="fill"
				/>
			</Box>
		</Box>
	);
};

export default Hero;
