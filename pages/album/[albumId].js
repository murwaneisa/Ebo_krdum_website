import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import AlbumInfoSection from "../../components/album/AlbumInfoSection";
import SongsListSection from "../../components/album/SongsListSection";
import Section from "../../components/UI/Section";
import data from "../../public/locale/en/albums";

const AlbumItems = () => {
  // useRouter from Next
  const router = useRouter();
  const albumQuery = router.query.albumId;

  // get album by id
  const album = data.find((item) => item.id === albumQuery);
  if (!album) {
    return <Section bg="brown">Loading...</Section>;
  }

  //const { title, description, year, image, photographer, albumSpotify } = album;

  return (
    <Box>
      {/* album info section */}
      {/* Want to pass in data via props: album title, description, year, spotify link for all album */}
      <AlbumInfoSection
        title={album.title}
        description={album.description}
        year={album.year}
        image={album.image}
        photographer={album.photographer}
        albumSpotify={album.albumSpotify}
      />

      {/* Album Songs section */}
      {/* Pass through album songs as props */}
      <SongsListSection songs={album.songs} />
    </Box>
  );
};

export default AlbumItems;
