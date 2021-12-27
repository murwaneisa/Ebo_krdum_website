import { Box } from "@chakra-ui/react";
import Beginning from "../components/bio/Beginning";
import Brief from "../components/bio/Brief";
import Last from "../components/bio/Last";
import MusicIdeology from "../components/bio/MusicIdeology";
import Section from "../components/UI/Section";
import sanityClient from "../lib/sanityClient";

const Biography = ({ bio }) => {
	console.log(bio[0].bioSectionTitle);
	return (
		<Box>
			{/* Brief  */}
			<Section title="Biography" pt="6rem" pb="2rem" bg="brown">
				<Brief />
			</Section>
			{/* beginning  */}
			<Section title="The Beginning" pt="2rem" pb="2rem" bg="yellow">
				<Beginning />
			</Section>
			{/* Musical ideology  */}
			<Section title="Musical Ideology" pt="2rem" pb="2rem" bg="brown">
				<MusicIdeology />
			</Section>
			{/* Last  */}
			<Section title="Inspirational Words" pt="2rem" pb="2rem" bg="yellow">
				<Last />
			</Section>
		</Box>
	);
};

export default Biography;

export async function getStaticProps() {
	const res = await sanityClient.fetch(`
  *[_type == "biography"]
  `);
	return {
		props: {
			bio: res,
		},
	};
}
