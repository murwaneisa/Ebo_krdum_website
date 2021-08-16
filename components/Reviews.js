import { Box, Link } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import data from "../public/locale/en/reviews";
import ReviewCard from "./UI/ReviewCard";

const Reviews = () => {
	// const arrowStyles = {
	//   position: "absolute",
	//   transform: "translate(-50%, -50%)",
	//   top: "50%",
	//   left: "10px",
	//   bottom: "auto",
	//   marginTop: "-13px",
	//   zIndex: 2,
	// };
	return (
		<Box w={["90vw", "80vw", "80vw", "80vw", "50vw"]}>
			<Carousel
				width="100%"
				showThumbs={false}
				infiniteLoop
				autoPlay
				showStatus={false}
				showArrows={false}
				useKeyboardArrows
				transitionTime={800}
				// renderArrowPrev={(onClickHandler, hasPrev, label) => (
				//   <button
				//     type="button"
				//     onClick={onClickHandler}
				//     title={label}
				//     style={{
				//       ...arrowStyles,
				//       right: "4.3em",
				//     }}
				//   >
				//     <IoMdArrowDropleft fontSize="30px" />
				//   </button>
				// )}
			>
				{data.map((review) => (
					<Link key={review.name} href={review.link} isExternal>
						<div>
							<ReviewCard
								name={review.name}
								text={review.text}
								logo={review.logo}
							/>
						</div>
					</Link>
				))}
			</Carousel>
		</Box>
	);
};

export default Reviews;
