import { Box } from "@chakra-ui/react";
import ShowsList from "../components/shows/ShowsList";
import Section from "../components/UI/Section";
import { shows } from "../public/locale/en/shows";

const Shows = () => {
  const todaysDate = new Date();

  // Prepare upcomingshows from data and reverse array for latest first
  const upcomingShows = shows.filter(
    (show) => new Date(show.date) > todaysDate
  );

  // Prepare former shows from data and reverse array
  const formerShows = shows
    .filter((show) => new Date(show.date) < todaysDate)
    .reverse();

  return (
    <Box>
      {/* upcoming shows*/}
      <Section title="Upcoming Shows" pt="6rem" pb="2rem" bg="brown">
        <Box>
          <ShowsList shows={upcomingShows} />
        </Box>
      </Section>
      {/* Former shows */}
      <Section title="Former Shows" pt="2rem" pb="2rem" bg="yellow">
        <Box>
          <ShowsList shows={formerShows} isFormerShows={true} />
        </Box>
      </Section>
    </Box>
  );
};

export default Shows;
