import { Box } from "@chakra-ui/react";
import React from "react";
import ShowsItem from "./ShowsItem";

const ShowsList = (props) => {
	console.log(props);
	return (
		<Box>
			{props.shows.map((show) => {
				const showDate = new Date(show.showDate);

				// check if upcoming show and render accordingly
				// render upcoming
				if (!props.isFormerShows) {
					return (
						<ShowsItem
							key={show._id}
							isUpcoming={true}
							showInfo={show}
							date={showDate}
							time="19:00"
						/>
					);
				} else {
					//render former
					return <ShowsItem key={show._id} showInfo={show} date={showDate} />;
				}
			})}
		</Box>
	);
};

export default ShowsList;
