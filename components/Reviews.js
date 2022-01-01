import { Box, Link } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReviewCard from "./UI/ReviewCard";

const Reviews = ({ reviews }) => {
  return (
    <Box
      w={[
        "90vw",
        "80vw",
        "80vw",
        "80vw",
        "50vw",
      ]} /* fix layout foe the next show and video and reviews  */
    >
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
        {reviews.map((review) => (
          <Link key={review._id} href={review.reviewLink} isExternal>
            <div>
              <ReviewCard
                name={review.reviewerName}
                text={review.reviewText}
                logo={review.reviewerLogo}
                language={review.reviewLang}
              />
            </div>
          </Link>
        ))}
      </Carousel>
    </Box>
  );
};

export default Reviews;
