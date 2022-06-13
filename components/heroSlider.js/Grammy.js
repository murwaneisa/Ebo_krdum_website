import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";

export const Grammy = () => {
	return (
		<Flex
			direction={["column", "row"]}
			w="100%"
			top={0}
			bottom={0}
			p={["0rem", "7.6rem", "6.2rem"]}
			//pb={["1.2rem", "0rem"]}
			bg={["linear-gradient(180deg, #5A879D 0%, #284140 100%)"]}
			position="absolute"
			justifyContent={"center"}
			justifyItems="center"
			alignItem="center"
			//border="solid 2px white"
		>
			<Box
				//border="solid 2px blue"
				w={["100%", "50%"]}
				h={["60%", "50%"]}
				top={0}
				bottom={0}
				objectFit="contain"
				position="relative"
			>
				<Box
					position="absolute"
					w="100%"
					top={0}
					bottom={0}
					//border="solid 2px green"
				>
					<Image src={"/images/grammy-22.jpg"} layout="fill" />
				</Box>
			</Box>
			<VStack
				zIndex={1}
				border="solid 2px red"
				w={["100%", "50%"]}
				m="0px"
				p="0px"
				justifyContent="center"
			>
				<Text fontWeight="bold" fontSize="xl">
					Grammy winner 2022
				</Text>
				<Text fontSize="xl">Grammy winner 2022</Text>
			</VStack>
		</Flex>
	);
};
