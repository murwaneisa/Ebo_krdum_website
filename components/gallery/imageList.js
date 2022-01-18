import { Box, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";
import { imageCDN } from "../../lib/imageCdnFn";
import ImageItem from "./imageItem";

const ImageList = ({ gallery }) => {
	//console.log("gallery", gallery);
	return (
		<Wrap px="1rem" spacing={4} justify="center">
			{/* class raw */}
			{gallery.map((album) => (
				<WrapItem
					border="solid red 2px"
					boxShadow="base"
					rounded="20px"
					overflow="hidden"
					lineHeight="0"
					_hover={{ boxShadow: "dark-lg", cursor: "pointer", opacity: 2 }}
					h="300X"
					w="300px"
				>
					<ImageItem
						key={album._id}
						mainImage={imageCDN(album.photoGalleryCover)} // imageCDN convert the sanity assets file to url
						date={album.photosDate}
						title={album.photoGalleryTitle}
					/>
				</WrapItem>
			))}
		</Wrap>
	);
};

export default ImageList;
