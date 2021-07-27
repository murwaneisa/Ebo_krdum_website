import Head from "next/head";

/* Components */
import Hero from "../components/Hero";
import Section from "../UI/Section";

export default function Home(props) {
	return (
		<div>
			{/* Hero image */}
			<Hero />
			{/* Other albums */}
			<Section bg="brown" pr="10%" pl="10%" pb="2%" pt="2%"></Section>
			<br />
			{/* Video */}
			{/* Next how */}
			{/* Review */}
		</div>
	);
}
