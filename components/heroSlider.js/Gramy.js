import { Box } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";

export const Gramy = () => {
	return (
		<Box
			w="100vw"
			h="100%"
			pt={["6.6rem", "7.6rem", "6.2rem"]}
			//pb={["1.2rem", "0rem"]}
			//bg="linear-gradient(180deg, #C2B552 0%, #795806 100%)"
			align="center"
		>
			<video autoPlay loop muted>
				<source src={"/002.mp4"} type="video/mp4" />
			</video>
			{/*   <Image src={} layout="fill" objectFit="cover"/> */}
		</Box>
	);
};
