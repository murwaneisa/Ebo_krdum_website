import { Box } from "@chakra-ui/react";
import React from "react";
import ShowsItem from "./ShowsItem";

const ShowsList = (props) => {
  return (
    <Box>
      {props.shows.map((show) => {
        const todaysDate = new Date();
        {
          /* console.log("todays date is: ", todaysDate); */
        }
        const showDate = new Date(show.date);
        {
          /* console.log("show date is: ", showDate);
        console.log(todaysDate > showDate); */
        }

        // check if upcoming show and render accordingly
        // render upcoming
        if (showDate > todaysDate) {
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
          return (
            <ShowsItem
              key={show.id}
              isUpcoming={false}
              showInfo={show}
              date={showDate}
            />
          );
        }
      })}
    </Box>
  );
};

export default ShowsList;
