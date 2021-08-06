import { Box, Text } from "@chakra-ui/react";
import AlbumInfoSection from "../../components/album/AlbumInfoSection";
import Section from "../../UI/Section";

const AlbumItems = () => {
  return (
    <Box border="solid 2px white">
      <AlbumInfoSection />

      {/* Album's Songs */}
      <Section bg="yellow" title="Album Songs" pt="1rem">
        <Box w={["100vw", "100vw", "50vw"]}>
          <Text>
            Lorem sadasdasd adsa ddasd asd asd ad asd asd adfgsfdgdfsg dfg dfg
            dfg Lorem sadasdasd adsa ddasd asd asd ad asd asd adfgsfdgdfsg dfg
            dfg dfgLorem sadasdasd adsa ddasd asd asd ad asd asd adfgsfdgdfsg
            dfg dfg dfgLorem sadasdasd adsa ddasd asd asd ad asd asd
            adfgsfdgdfsg dfg dfg dfgLorem sadasdasd adsa ddasd asd asd ad asd
            asd adfgsfdgdfsg dfg dfg dfgLorem sadasdasd adsa ddasd asd asd ad
            asd asd adfgsfdgdfsg dfg dfg dfgLorem sadasdasd adsa ddasd asd asd
            ad asd asd adfgsfdgdfsg dfg dfg dfgLorem sadasdasd adsa ddasd asd
            asd ad asd asd adfgsfdgdfsg dfg dfg dfg
          </Text>
        </Box>
      </Section>
    </Box>
  );
};

export default AlbumItems;
