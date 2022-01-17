import { Box } from "@chakra-ui/react";
import React from "react";
import { imageCDN } from "../../lib/imageCdnFn";
import ImageItem from "./imageItem";

const ImageList = ({ gallery }) => {
	return (
		<Box>
			{gallery.map((album) => {
				const imageURL = imageCDN(album.photoGalleryCover);
				//console.log(album.photoGalleryTitle);
				<ImageItem
					key={album._id}
					mainImage={imageURL}
					date={album.photosDate}
					title={album.photoGalleryTitle}
				/>;
			})}
		</Box>
	);
};

export default ImageList;
