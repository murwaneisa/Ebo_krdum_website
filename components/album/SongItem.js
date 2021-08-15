import {
  Box,
  Divider,
  Flex,
  HStack,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FiPlayCircle } from "react-icons/fi";
import CustomImage from "../UI/CustomImage";

const SongItem = (props) => {
  const { name, spotify } = props;
  return (
    <Box p="1rem">
      {/* Divider between each song */}
      <Divider mb="2rem" />
      {/* Flex box for main song section */}
      <Flex direction="row" justify="space-between" align="flex-end">
        {/* Stack section for play button and song name */}
        <HStack spacing="1rem">
          <Link href="">
            <FiPlayCircle />
          </Link>

          <Text>{name}</Text>
        </HStack>
        {/* Linked Stack box of Spotify, following guidelines of Spotify to write "Play on" the the image. Se https://developer.spotify.com/documentation/general/design-and-branding/#using-our-logo */}
        <Link href={spotify} isExternal>
          <Stack width="9rem" align="flex-end" spacing="-1">
            <Box width="40%">
              <Text fontSize="sm" fontWeight="bold">
                Play on
              </Text>
            </Box>
            <Box width="60%">
              <CustomImage
                src="/images/spotify-logos/Spotify_Logo_RGB_White.png"
                layout="fill"
              />
            </Box>
          </Stack>
        </Link>
      </Flex>
    </Box>
  );
};

export default SongItem;
