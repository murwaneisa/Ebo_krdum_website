import { Box } from "@chakra-ui/react";

/* Label/value pair used for Genre · Released · Recorded etc. */
export default function MetaItem({ label, value }) {
  return (
    <Box>
      <Box
        fontSize="11px"
        letterSpacing="0.24em"
        textTransform="uppercase"
        color="bronze"
      >
        {label}
      </Box>
      <Box fontFamily="display" fontSize="20px" mt="6px" color="cream">
        {value}
      </Box>
    </Box>
  );
}
