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
			<Section bg="brown" p="10%">
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
			<Section bg="yellow" py="10%" px="5%">
				{
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
						cupiditate incidunt quas tempore assumenda, nulla iusto at sint
						tenetur debitis officiis doloribus totam molestiae, voluptates dicta
						reprehenderit repellat earum quidem? Soluta, totam possimus.
						Quisquam, voluptas reprehenderit? Eos ipsa, dolores natus a
						architecto perspiciatis asperiores blanditiis rerum, impedit esse
						facilis repellat, ullam expedita in consequatur inventore nesciunt
						minus ut eligendi. Tempora, consequatur officia velit incidunt,
						earum a labore optio temporibus nesciunt, eveniet similique aliquid
						recusandae adipisci inventore voluptas. Amet quae similique est
						impedit magnam? Quidem consequatur recusandae autem quos ratione qui
						soluta molestiae inventore magni. Eius pariatur et ipsum consectetur
						molestias.
					</p>
				}
			</Section>
			{/* Next how */}
			{/* Review */}
		</div>
	);
}
