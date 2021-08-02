/* Components */
import Hero from "../components/Hero";
import data from "../public/locale/en/albums.js";
import AlbumCard from "../UI/AlbumCard";
import Section from "../UI/Section";
import { Flex } from "@chakra-ui/layout";

export default function Home(props) {
	return (
		<div>
			{/* Hero image */}
			<Hero />
			{/* Other albums */}
			<Section bg="brown" p="10%" heading="other Albums">
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
			<Section bg="yellow" py="10%" px="5%" heading="ther sectiion">
				{<div></div>}
			</Section>
			{/* Next how */}
			{/* Review */}
		</div>
	);
}
