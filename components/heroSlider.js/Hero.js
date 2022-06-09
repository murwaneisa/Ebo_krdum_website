import { Box, Flex, Text } from "@chakra-ui/layout";
import { VStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
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
		<Box
			w="100vw"
			h="100%"
			pt={["6.6rem", "7.6rem", "6.2rem"]}
			pb={["1.2rem", "0rem"]}
			bg="linear-gradient(180deg, #C2B552 0%, #795806 100%)"
			align="center"
		>
			<Flex direction={["column", "row"]} w={["100%", "96%", "90%", "80%"]}>
				<Box
					position="relative"
					w="100vw"
					h={["40vh", "45vh", "43vh", "35vh", "80vh"]}
				>
					<Image
						src={hero}
						alt="This is the main hero image of Ebo Krdums website"
						layout="fill"
						placeholder="blur"
						//width="100%"
						objectFit="contain"
					/>
				</Box>
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
							fontFamily="Alex Brush, cursive"
						>
							Diversity
						</Text>
					</Box>
					<Box>
						<Link href={`/album/${slug}`}>
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
