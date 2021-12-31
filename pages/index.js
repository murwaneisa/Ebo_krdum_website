/* Components */

import { Box, Stack } from "@chakra-ui/react";
import sanityClient from "../lib/sanityClient";
import Head from "next/head";
/* Components */
import Hero from "../components/Hero";
import NextShow from "../components/NextShow";
import Reviews from "../components/Reviews";
import AlbumCard from "../components/UI/AlbumCard";
import Section from "../components/UI/Section";
import Video from "../components/Video";
import data from "../public/locale/en/albums.js";
import reviews from "../public/locale/en/reviews";

export default function Home(props) {
	return (
		<div>
			<Head>
				{/* <link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> */}
				<link
					href="https://fonts.googleapis.com/css2?family=Alex+Brush&display=swap"
					rel="stylesheet"
				/>
			</Head>
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
				<NextShow shows={props.shows} />
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

export async function getStaticProps() {
	const res = await sanityClient.fetch(`
*[_type == "show"]
`);

	const reviews = await sanityClient.fetch(`
*[_type == "review"]
`);
	console.log("res", res);
	console.log("review", reviews);
	return {
		props: {
			shows: res,
			reviews: reviews,
		},
	};
}
