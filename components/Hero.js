import { Box } from "@chakra-ui/layout";
/* Component */
import Image from "../ui/Image";
import Section from "../UI/Section";

const Hero = () => {
	return (
		<Section
			w="100%"
			h="auto"
			pt="100px"
			bg="linear-gradient(180deg, #C2B552 0%, #795806 100%)"
		>
			<Box w={["100%", "50%"]}>
				<Image
					src="/images/ebo-transparent.png"
					layout="fill"
					width="100%"
					objectFit="contain"
				/>
			</Box>
		</Section>
	);
};

export default Hero;
