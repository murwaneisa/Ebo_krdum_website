import { Box, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";
import { imageCDN } from "../../lib/imageCdnFn";
import ImageItem from "./imageItem";

const ImageList = ({ gallery }) => {
	return (
		<Wrap spacing={8} justify="center" py="2%">
			{/* class raw */}
			{gallery.map((album) => (
				<WrapItem
					position="relative"
					boxShadow="base"
					lineHeight="0"
					w="auto"
					h="auto"
					_hover={{
						boxShadow: "dark-lg",
						cursor: "pointer",
						opacity: 2,
					}}
					key={album._id}
				>
					<ImageItem
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
