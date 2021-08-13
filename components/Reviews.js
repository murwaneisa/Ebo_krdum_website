import Section from "../UI/Section";
import ReviewCard from "../UI/ReviewCard";
import data from "../public/locale/reviews";

const Reviews = () => {
	return (
		<Section bg="yellow">
			{data.map((review) => (
				<ReviewCard name={review.name} text={review.tet} />
			))}
		</Section>
	);
};

export default Reviews;
