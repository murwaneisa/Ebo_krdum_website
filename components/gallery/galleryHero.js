import { Box, Text, Heading, Stack } from "@chakra-ui/react";

const galleryHero = () => {
	return (
		<Box
			w="100vw"
			h="60vh"
			bg="brown"
			justifyContent="center"
			pt={["35%", "25%", "20%", "15%", "8%"]}
		>
			<Stack
				textAlign="center"
				w={["100%", "50%"]}
				h="auto"
				m="0px auto"
				p="1%"
				justifyContent="center"
				flexDirection="column"
				spacing="5%"
			>
				<Heading size="xl" as="h1" color="white" textAlign="center">
					Photo Gallery
				</Heading>
				<Text>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam
					labore porro odio animi aut fugiat, error eligendi dolores a dolor
					saepe vero ipsam temporibus voluptates? Error quibusdam aperiam
					sapiente perferendis.
				</Text>
			</Stack>
		</Box>
	);
};

export default galleryHero;
