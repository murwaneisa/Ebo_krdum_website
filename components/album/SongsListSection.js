import { Box } from "@chakra-ui/react";
import Section from "../UI/Section";
import SongItem from "./SongItem";

const SongsListSection = ({ songs }) => {
  return (
    <Section bg="yellow" title="Album Songs" py="2rem">
      <Box w={["100vw", "80vw", "60vw", "60vw", "55vw"]}>
        {songs.map((song) => (
          <SongItem
            key={song.name}
            name={song.name}
            spotify={song.spotify}
            trialSong={song.trialSong}
          />
        ))}
      </Box>
    </Section>
  );
};

export default SongsListSection;
