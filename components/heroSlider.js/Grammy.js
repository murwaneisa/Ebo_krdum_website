import { Box } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";

export const Grammy = () => {
	return (
		<Box
			w="100%"
			top={0}
			bottom={0}
			//pt={["6.6rem", "7.6rem", "6.2rem"]}
			//pb={["1.2rem", "0rem"]}
			bg="linear-gradient(176hsv, 18.29%, 38.04%)"
			align="center"
			position="absolute"
		>
			<Image src={"/images/grammy-22.jpg"} layout="fill" objectFit="contain" />
		</Box>
	);
};
