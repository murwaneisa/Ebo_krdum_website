import { Box, Flex, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";

export const Grammy = () => {
	return (
		<Flex
			direction={["column", "column", "row"]}
			w="100%"
			h="100%"
			position="absolute"
			//m="0"
			p={["0%", "0%", "0%", "7.6%"]}
			//pb={["0rem", "0rem"]}
			bg={["linear-gradient(180deg, #5A879D 0%, #284140 100%)"]}
			justifyContent="center"
			justifyItems="center"
			alignitem="center"
			//border="solid 2px white"
		>
			<Box
				//border="solid 2px blue"
				w={["100%", "100%", "50%"]}
				h={["74%", "80%", "100%", "100%", "100%"]}
				top={0}
				bottom={0}
				position="relative"
				zIndex={20}
				border={[
					"0px solid white",
					"0px solid white",
					"0px solid white",
					"2px solid white",
				]}
			>
				<Box position="absolute" w="100%" h="100%" top={0} bottom={0}>
					<Image src={"/images/grammy-22.jpg"} layout="fill" objectFit="fill" />
				</Box>
			</Box>
			{/* text section */}
			<VStack
				zIndex={1}
				//border="solid 2px red"
				w={["100%", "100%", "50%"]}
				m="0px"
				justifyContent="center"
				//direction={["row"]}
				pl={["0%", "0%", "3%"]}
			>
				<Text
					fontWeight="bold"
					//fontFamily="Alex Brush, cursive"
					fontStyle="italic"
					//fontSize={["2rem", "2.8rem", "3.5rem", "5rem", "6rem"]}
					fontSize={["sm", "xl", "xl", "3xl"]}
				>
					Swedish Grammy winner 2022
				</Text>

				<Stack direction={["row", "row", "column"]} alignItems="center">
					<Image
						src={"/images/gramis-logo.png"}
						width={60}
						height={50}
						objectFit="contain"
					/>
					<Text fontSize={["sm", "md", "xl"]}>Folk music of the year 2022</Text>
				</Stack>
			</VStack>
		</Flex>
	);
};
