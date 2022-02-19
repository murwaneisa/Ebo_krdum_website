import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { imageCDN } from "../../lib/imageCdnFn";

function ImageSlider({ images }) {
	const cards = [
		"https://images.unsplash.com/photo-1612852098516-55d01c75769a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
		"https://images.unsplash.com/photo-1627875764093-315831ac12f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
		"https://images.unsplash.com/photo-1571432248690-7fd6980a1ae2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
	];

	const url = imageCDN(images[0].itemImage);
	console.log("object", images);
	return (
		<Carousel
			width="100%"
			showThumbs={false}
			infiniteLoop
			autoPlay
			showStatus={false}
			showArrows={false}
			useKeyboardArrows
			transitionTime={800}
		>
			{images.map((img) => (
				<Box>
					<Image
						src={imageCDN(img.itemImage)}
						width={600}
						height={600}
						objectFit="contain"
					/>
					<Box>{img.photoCaption}</Box>
				</Box>
			))}
		</Carousel>
	);
}
export default ImageSlider;
