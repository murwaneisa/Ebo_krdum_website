import { Box } from "@chakra-ui/react";
import RenderedText from "../components/bio/RenderdText";
import Section from "../components/UI/Section";
import { blockContentConverter } from "../lib/blockContentConverter";
import sanityClient from "../lib/sanityClient";

const Biography = ({ bios }) => {
  return (
    <Box>
      {bios.map((bio, i) => {
        return (
          <Section
            key={bio._id}
            title={bio.bioSectionTitle}
            pt={i == 0 ? "6rem" : "2rem"}
            pb="2rem"
            bg={i % 2 == 0 ? "brown" : "yellow"}
          >
            <RenderedText text={blockContentConverter(bio.bioSectionText)} />
          </Section>
        );
      })}
    </Box>
  );
};

export default Biography;

export async function getStaticProps() {
  const res = await sanityClient.fetch(`
  *[_type == "biography"] | order(order asc)
  `);
  return {
    props: {
      bios: res,
    },
  };
}

/* 	
<Section title="The Beginning" pt="2rem" pb="2rem" bg="yellow">
<Beginning />
</Section>

<Section title="Musical Ideology" pt="2rem" pb="2rem" bg="brown">
<MusicIdeology />
</Section>

<Section title="Inspirational Words" pt="2rem" pb="2rem" bg="yellow">
<Last />
</Section>
 */
