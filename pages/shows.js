import { Box } from "@chakra-ui/react";
import ShowsList from "../components/shows/showsList";
import Section from "../UI/Section";

const Shows = () => {
  return (
    <Box>
      {/* upcoming shows*/}
      <Section title="Upcoming Shows" pt="5rem" pb="2rem" bg="brown">
        <Box>
          <ShowsList />
        </Box>
      </Section>
      {/* Former shows */}
      <Section title="Former Shows" pt="2rem" pb="2rem" bg="yellow">
        <Box>
          <ShowsList />
        </Box>
      </Section>
    </Box>
  );
};

export default Shows;
