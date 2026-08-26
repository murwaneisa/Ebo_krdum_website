import { Box } from "@chakra-ui/react";

/* Label/value pair used for Genre · Released · Recorded etc. */
export default function MetaItem({ label, value }) {
  return (
    <Box>
      <Box textStyle="microLabel" color="bronze">
        {label}
      </Box>
      <Box textStyle="cardTitle" mt="1.5" color="cream">
        {value}
      </Box>
    </Box>
  );
}
