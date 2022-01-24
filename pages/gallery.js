import React from "react";
import GalleryHero from "../components/gallery/galleryHero";
import ImageList from "../components/gallery/imageList";
import Tabes from "../components/gallery/tabes";
import sanityClient from "../lib/sanityClient";

const Gallery = ({ gallery }) => {
	return (
		<div>
			<GalleryHero />
			<Tabes gallery={gallery} />
		</div>
	);
};

export default Gallery;

export async function getStaticProps() {
	const res = await sanityClient.fetch(`
  *[_type == "gallery"] | order(order asc)
  `);
	console.log(res);
	return {
		props: {
			gallery: res,
		},
		revalidate: 24 * 60 * 60,
	};
}
