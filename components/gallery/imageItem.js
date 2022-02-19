import { Box, Flex, Stack, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import GalleyModel from "./galleyModel";
import ImageSlider from "./imageSlider";

const ImageItem = ({ mainImage, date, title, images }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const color = "white";
	//const hoverColor = "#C6C6C6";
	return (
		<Stack
			direction="column"
			//border="solid 2px blue"
			//position="relative"
			//bg="#ffedd1"
			onClick={onOpen}
		>
			<GalleyModel
				isOpen={isOpen}
				onClose={onClose}
				title={title}
				images={images}
			/>
			<Box
				opacity="0.8"
				_hover={{ opacity: 1 }}
				h={["15rem", "18rem", "20rem"]}
				w={["15rem", "18rem", "22rem"]}
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
				py="0.5rem"
				justifyContent="center"
				textAlign="center"
				spacing={["1rem", "1rem"]}
			>
				<Box
					borderWidth="2px"
					borderRadius="md"
					boxShadow="md"
					px={3}
					py={3}
					//bg={color}
					borderColor={color}
					color={color}
				>
					<Text fontWeight="bold">#{title}</Text>
				</Box>
				{date ? (
					<Box
						borderWidth="2px"
						borderRadius="md"
						boxShadow="md"
						//bg={color}
						borderColor={color}
						px={3}
						py={3}
						color={color}
					>
						<Text fontWeight="bold">{date}</Text>
					</Box>
				) : null}
			</Stack>
		</Stack>
	);
};

export default ImageItem;
