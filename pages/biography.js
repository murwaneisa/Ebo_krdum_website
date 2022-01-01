import { Box } from "@chakra-ui/react";
import PortableText from "react-portable-text";
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
              <PortableText // https://www.npmjs.com/package/react-portable-text
                content={bio.bioSectionText}
                serializers={{
                  h3: function h3fn(props) {
                    return <CustomH4 {...props} />;
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
  };
}
