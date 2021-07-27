import Head from "next/head";
import data from "../public/locale/en/albums.js";
/* Components */
import Hero from "../components/Hero";
import Section from "../UI/Section";
import AlbumCard from "../UI/AlbumCard";

export default function Home(props) {
	return (
		<div>
			{/* Hero image */}
			<Hero />
			{/* Other albums */}
			<Section bg="brown" pr="10%" pl="10%" pb="2%" pt="2%">
				{data.map((album) => (
					<AlbumCard
						key={album.id}
						year={album.year}
						image={album.image}
						title={album.title}
					/>
				))}
			</Section>
			{/* Video */}
			<Section bg="yellow" pr="10%" pl="10%" pb="2%" pt="2%"></Section>
			{/* Next how */}
			{/* Review */}
		</div>
	);
}
