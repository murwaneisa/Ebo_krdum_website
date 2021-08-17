import { Box } from "@chakra-ui/react";
import Beginning from "../components/bio/Beginning";
import Brief from "../components/bio/Brief";
import Last from "../components/bio/Last";
import MusicIdeology from "../components/bio/MusicIdeology";
import Section from "../components/UI/Section";

const Biography = () => {
  return (
    <Box>
      {/* Brief  */}
      <Section title="Biography" pt="6rem" pb="2rem" bg="brown">
        <Brief />
      </Section>
      {/* beginning  */}
      <Section title="Beginning" pt="2rem" pb="2rem" bg="yellow">
        <Beginning />
      </Section>
      {/* Musical ideology  */}
      <Section title="Musical Ideology" pt="2rem" pb="2rem" bg="brown">
        <MusicIdeology />
      </Section>
      {/* Last  */}
      <Section title="Last words" pt="2rem" pb="2rem" bg="yellow">
        <Last />
      </Section>
    </Box>
  );
};

export default Biography;
