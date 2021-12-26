import { Box, Text, VStack } from "@chakra-ui/react";
import { FiHeadphones } from "react-icons/fi";
import Section from "../UI/Section";
import SongItem from "./SongItem";

const SongsListSection = ({ songs }) => {
  return (
    <Section bg="yellow" title="Album Songs" py="2rem">
      <Box w={["100vw", "80vw", "60vw", "60vw", "55vw"]}>
        <VStack>
          <FiHeadphones size="24px" />
          <Text fontWeight="bold" fontSize={["xs", "sm"]}>
            Click play to listen to the demo
          </Text>
        </VStack>
        {songs.map((song) => (
          <SongItem
            key={song._key}
            name={song.songName}
            spotify={song.spotifyUrl}
            trialSong={song.demoFile}
          />
        ))}
      </Box>
    </Section>
  );
};

export default SongsListSection;
