import { Box } from "@chakra-ui/react";
import ShowsList from "../components/shows/ShowsList";
import Section from "../components/UI/Section";
import { formerShows, uppComingShows } from "../public/locale/en/shows";

const Shows = () => {
  return (
    <Box>
      {/* upcoming shows*/}
      <Section title="Upcoming Shows" pt="6rem" pb="2rem" bg="brown">
        <Box>
          <ShowsList shows={uppComingShows} />
        </Box>
      </Section>
      {/* Former shows */}
      <Section title="Former Shows" pt="2rem" pb="2rem" bg="yellow">
        <Box>
          <ShowsList shows={formerShows} />
        </Box>
      </Section>
    </Box>
  );
};

export default Shows;
