import { Box, Flex, Text } from "@chakra-ui/layout";
import { Stack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// @ts-ignore
import hero from "../../public/images/ebo-transparent.png";
import Button from "../UI/Button";
/*
 * the array of percentage({["10%", "40%"]}) represent the  breakpoint for the element start from mobile to lager screen
 * check the link for more details:
 *https://chakra-ui.com/docs/features/responsive-styles
 * add blur from Next js check ou :https://github.com/vercel/next.js/blob/canary/examples/image-component/pages/placeholder.js
 */

const Hero = ({ slug }) => {
	return (
		<Flex
			w="100%"
			position="relative"
			h={["92vh", "78vh", "80vh", "75vh", "75vh", "80vh"]}
			bg="linear-gradient(180deg, #C2B552 0%, #795806 100%)"
			//border="solid 2px red"
			direction={["column", "row"]}
			justifyContent={["flex-end"]}
			align="center"
			pl={["0%", "1.5%", "5%", "5%", "5%", "15%"]}
			pr={["0%", "1.5%", "2%", "5%", "5%", "15%"]}
			pb={["0%", "0%", "8%", "9%", "6%"]}
			pt={["0%", "10%", "0%", "0%"]}
		>
			<Box
				mt={["15%", "0%", "20%"]}
				w={["100%", "100%", "100%"]}
				h={["100%", "100%"]}
				position="relative"
				top="0"
				bottom="0"
				left="0"
				right="0"
				//border="solid 2px blue"
				//bg="red"
			>
				<Image
					src={hero}
					alt="This is the main hero image of Ebo Krdums website"
					layout="fill"
					placeholder="blur"
					objectFit="contain"
				/>
			</Box>
			<Stack
				direction="column"
				spacing={-1}
				align="center"
				mt={["0%", "55%", "40%", "50%"]}
				mb={["10%", "15%", "20%"]}
				//ml={["20%", "0%"]}
				//mr={["20%", "0%"]}
				//border="1px blue solid"
				zIndex={1}
				position={["relative", "absolute"]}
			>
				<Box>
					<Text
						color="brown"
						fontWeight="bold"
						fontStyle="italic"
						fontSize={["1rem", "1rem", "1rem", "1rem", "1rem", "2rem", "3rem"]}
					>
						Latest Album
					</Text>
				</Box>
				<Box>
					<Text
						color="brown"
						fontWeight="bold"
						fontStyle="italic"
						fontSize={[
							"2.8rem",
							"2.8rem",
							"3.5rem",
							"5rem",
							"6rem",
							"8rem",
							"15rem",
						]}
						fontFamily="Alex Brush, cursive"
					>
						Diversity
					</Text>
				</Box>
				<Box>
					<Link href={`/album/${slug}`}>
						<a>
							<Button Button>View Album</Button>
						</a>
					</Link>
				</Box>
			</Stack>
		</Flex>
	);
};

export default Hero;
