import { Box } from "@chakra-ui/react";
import React from "react";
import ShowsItem from "./ShowsItem";

const ShowsList = () => {
  return (
    <Box>
      <ShowsItem />
      <ShowsItem />
    </Box>
  );
};

export default ShowsList;
