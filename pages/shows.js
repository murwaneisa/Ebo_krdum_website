import { Box } from "@chakra-ui/react";
import ShowsList from "../components/shows/ShowsList";
import Section from "../components/UI/Section";
import sanityClient from "../lib/sanityClient";

const Shows = ({ shows }) => {
  const todaysDate = new Date();

  // Prepare upcomingShows from data and reverse array for latest first
  const upcomingShows = shows.filter(
    (show) => new Date(show.showDate) > todaysDate
  );

  const sortByDate = (upcomingShows) => {
    //sorting the upcoming show to render the nearest date first
    const sorter = (a, b) => {
      return new Date(a.showDate).getTime() - new Date(b.showDate).getTime();
    };
    upcomingShows.sort(sorter);
  };
  sortByDate(upcomingShows);
  // Prepare former shows from data and reverse array
  const formerShows = shows
    .filter((show) => new Date(show.showDate) < todaysDate)
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

export async function getStaticProps() {
  const res = await sanityClient.fetch(`
*[_type == "show"]
`);

  return {
    props: {
      shows: res,
    },
  };
}
