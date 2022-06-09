import { Box } from "@chakra-ui/react";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Gramy } from "./Gramy";
import Hero from "./Hero";

export const HeroSlider = ({ slug }) => {
	return (
		<Box
			w="100vw"
			overflow="hidden"
			position="relative"
			zIndex="1"
			alignSelf="center"
			border="solid 2px red"
		>
			<Carousel
				width="100%"
				showArrows={true}
				showThumbs={false}
				infiniteLoop
				autoPlay
				interval={6000}
				showStatus={false}
				useKeyboardArrows
				transitionTime={1000}
			>
				<div>
					<Hero slug={slug} />
				</div>
				<div>
					<Gramy />
				</div>
			</Carousel>
		</Box>
	);
};
