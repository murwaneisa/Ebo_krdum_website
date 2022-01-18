import { Box, Flex, WrapItem } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";

const ImageItem = ({ mainImage, date, title }) => {
	return (
		<Flex position="relative" direction="row">
			<Box
				position="relative"
				opacity="0.8"
				_hover={{ opacity: 1 }}
				border="solid 2px blue"
				h="auto"
				w="auto "
			>
				<Image src={mainImage} height={600} width={400} objectFit="contain" />
			</Box>
			<Flex zIndex={1} position="absolute" top="0" color="#fff">
				<Box>{title}</Box>
				<Box>{date}</Box>
			</Flex>
		</Flex>
	);
};

export default ImageItem;
