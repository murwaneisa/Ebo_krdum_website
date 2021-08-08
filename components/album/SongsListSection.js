import { Box } from "@chakra-ui/react";
import data from "../../public/locale/en/albums";
import Section from "../../UI/Section";
import SongItem from "./SongItem";

const SongsListSection = () => {
	return (
		<Section bg="yellow" title="Album Songs" py="2rem">
			<Box w={["100vw", "80vw", "60vw", "60vw", "55vw"]}>
				{data[1].songs.map((song) => (
					<SongItem key={song.name} name={song.name} spotify={song.spotify} />
				))}
			</Box>
		</Section>
	);
};

export default SongsListSection;
