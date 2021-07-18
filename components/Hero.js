import { Box } from "@chakra-ui/layout";
import Image from "next/image";
import ButtonUi from "../UI/Button";

const Hero = () => {
	return (
		<Box
			m="0 auto"
			height="auto"
			width="auto"
			bgColor="yellow"
			align="center"
			justifyItems="end"
			pb="0"
			position="relative"
		>
			<Box position="relative" pb="0">
				<Image
					src="/images/ebo.png"
					objectFit="contain"
					width={500}
					height={500}
				/>
			</Box>
		</Box>
	);
};

export default Hero;
