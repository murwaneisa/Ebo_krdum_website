import { Box } from "@chakra-ui/react";
import React from "react";
import ShowsItem from "./ShowsItem";

const ShowsList = (props) => {
  return (
    <Box>
      {props.shows.map((show) => {
        const showDate = new Date(show.date);

        // check if upcoming show and render accordingly
        // render upcoming
        if (!props.isFormerShows) {
          return (
            <ShowsItem
              key={show.id}
              isUpcoming={true}
              showInfo={show}
              date={showDate}
            />
          );
        } else {
          //render former
          return <ShowsItem key={show.id} showInfo={show} date={showDate} />;
        }
      })}
    </Box>
  );
};

export default ShowsList;
