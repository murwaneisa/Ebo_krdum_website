import { Box } from "@chakra-ui/react";
import { PortableText } from "@portabletext/react";
import CustomH4 from "../components/UI/CustomH4";
import Section from "../components/UI/Section";
import TextSectionStack from "../components/UI/TextSectionStack";
import sanityClient from "../lib/sanityClient";

const Biography = ({ bios }) => {
  const numberOfBioSections = bios.length;

  return (
    <Box>
      {bios.map((bio, index) => {
        return (
          <Section
            key={bio._id}
            title={bio.bioSectionTitle}
            pt={index == 0 ? "8rem" : "2rem"}
            pb="2rem"
            bg={index % 2 == 0 ? "brown" : "yellow"}
            borderBottom={
              index == numberOfBioSections - 1 && numberOfBioSections % 2 == 1
                ? "solid 0.5px white"
                : ""
            }
          >
            <TextSectionStack>
              <PortableText // https://www.npmjs.com/package/@portabletext/react
                value={bio.bioSectionText}
                components={{
                  block: {
                    h3: function h3fn({ children }) {
                      return <CustomH4>{children}</CustomH4>;
                    },
                  },
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
    revalidate: 24 * 60 * 60,
  };
}
