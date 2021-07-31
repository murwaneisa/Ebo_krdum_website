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
			<Section
				bg="brown"
				p="10%"
				heading="other Albums"
				heading="other Ea;bums"
			>
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
				{
					<div>
						<img src="/images/hero.jpg" />
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
							cupiditate incidunt quas tempore assumenda, nulla iusto at sint
							tenetur debitis officiis doloribus totam molestiae, voluptates
							dicta reprehenderit repellat earum quidem? Soluta, totam possimus.
							Quisquam, voluptas reprehenderit? Eos ipsa, dolores natus a
							architecto perspiciatis asperiores blanditiis rerum, impedit esse
							facilis repellat, ullam expedita in consequatur inventore nesciunt
							minus ut eligendi. Tempora, consequatur officia velit incidunt,
							earum a labore optio temporibus nesciunt, eveniet similique
							aliquid recusandae adipisci inventore voluptas. Amet quae
							similique est impedit magnam? Quidem consequatur recusandae autem
							quos ratione qui soluta molestiae inventore magni. Eius pariatur
							et ipsum consectetur molestias.
						</p>
					</div>
				}
			</Section>
			{/* Next how */}
			{/* Review */}
		</div>
	);
}
