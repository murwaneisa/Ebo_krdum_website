/* Components */
import Hero from "../components/Hero";
import data from "../public/locale/en/albums.js";
import AlbumCard from "../UI/AlbumCard";
import Section from "../UI/Section";

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
        title="Other Albums"
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
        {<div></div>}
      </Section>
      {/* Next how */}
      {/* Review */}
    </div>
  );
}
