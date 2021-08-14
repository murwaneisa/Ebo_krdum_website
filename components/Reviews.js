import Section from "../UI/Section";
import ReviewCard from "../UI/ReviewCard";
import data from "../public/locale/reviews";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Box } from "@chakra-ui/react";

const Reviews = () => {
	return (
		<Carousel
			width="70vw"
			showThumbs={false}
			infiniteLoop
			autoPlay
			showStatus={false}
			showArrows={false}
			useKeyboardArrows
			transitionTime={400}
		>
			{data.map((review) => (
				<div key={review.name}>
					<ReviewCard
						name={review.name}
						text={review.text}
						logo={review.logo}
					/>
				</div>
			))}
		</Carousel>
	);
};

export default Reviews;
