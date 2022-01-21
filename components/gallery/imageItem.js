import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";

const ImageItem = ({ mainImage, date, title }) => {
	return (
		<Stack
			direction="column"
			//border="solid 2px blue"
			//position="relative"
		>
			<Box
				opacity="0.8"
				_hover={{ opacity: 1 }}
				h={["15rem", "18rem", "20rem"]}
				w={["15rem", "18rem", "20rem"]}
				position="relative"
			>
				<Image
					src={mainImage}
					layout="fill"
					objectFit="cover"
					objectPosition="center"
				/>
			</Box>
			<Stack
				direction={["column", "row", "row"]}
				py="1rem"
				w="100%"
				h="10%"
				justifyContent="center"
				textAlign="center"
				spacing={["2rem", "1rem"]}
			>
				<Box>
					<Text fontSize={["sm", "md", "lg"]}>{title}</Text>
				</Box>
				<Text>{date}</Text>
			</Stack>
		</Stack>
	);
};

export default ImageItem;
