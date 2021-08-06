import { Box } from "@chakra-ui/react";
import AlbumInfoSection from "../../components/album/AlbumInfoSection";
import SongsListSection from "../../components/album/SongsListSection";

const AlbumItems = () => {
  return (
    <Box border="solid 2px white">
      <AlbumInfoSection />

      {/* Album's Songs */}
      <SongsListSection />
    </Box>
  );
};

export default AlbumItems;
