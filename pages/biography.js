import { Box, Text } from "@chakra-ui/react";
import PortableText from "react-portable-text";
import CustomH4 from "../components/UI/CustomH4";
import Section from "../components/UI/Section";
import TextSectionStack from "../components/UI/TextSectionStack";
import sanityClient from "../lib/sanityClient";

const Biography = ({ bios }) => {
  return (
    <Box>
      {bios.map((bio, i) => {
        console.log(bio.bioSectionText);
        return (
          <Section
            key={bio._id}
            title={bio.bioSectionTitle}
            pt={i == 0 ? "6rem" : "2rem"}
            pb="2rem"
            bg={i % 2 == 0 ? "brown" : "yellow"}
          >
            <TextSectionStack>
              <PortableText // https://www.npmjs.com/package/react-portable-text
                content={bio.bioSectionText}
                serializers={{
                  h3: (props) => <CustomH4 {...props} />,
                  normal: (props) => <Text {...props} />,
                }}
              />
            </TextSectionStack>
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
