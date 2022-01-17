import { Box } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";

const ImageItem = ({ mainImage, date, title }) => {
	console.log("title", title);
	return (
		<Box>
			<Image src={mainImage} layout="fill" />
			<div>{title}</div>
		</Box>
	);
};

export default ImageItem;
