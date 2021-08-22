/* Components */

import { Box, Stack } from "@chakra-ui/react";

/* Components */
import Hero from "../components/Hero";
import NextShow from "../components/NextShow";
import Reviews from "../components/Reviews";
import AlbumCard from "../components/UI/AlbumCard";
import Section from "../components/UI/Section";
import Video from "../components/Video";
import data from "../public/locale/en/albums.js";

export default function Home(props) {
	return (
		<div>
			{/* Hero image */}
			<Hero />
			{/* Other albums */}
			<Section
				bg="brown"
				px={["2rem", "2rem", "3rem", "6.2rem"]}
				py="2rem"
				title="Albums"
			>
				<Box>
					<Stack
						direction={["column", "column", "row"]}
						spacing={["5%", "1%", "1%", "3%"]}
						align="center"
					>
						{data.map((album) => (
							<AlbumCard
								key={album.id}
								id={album.id}
								year={album.year}
								image={album.image}
								title={album.title}
							/>
						))}
					</Stack>
				</Box>
			</Section>

			{/* Video */}
			<Section bg="yellow" title="Videos" py="2rem">
				<Video />
			</Section>

			{/*  Next Show */}
			<Section bg="brown" title="Next Show" py="2rem">
				<NextShow />
			</Section>

			{/* Review */}
			<Section bg="yellow" pt="2rem" pb="5rem" title="Reviews">
				<Box align="center">
					<Reviews />
				</Box>
			</Section>
		</div>
	);
}
