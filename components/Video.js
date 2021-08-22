import { AspectRatio, Box, HStack, Link } from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";
const Video = () => {
	return (
		<Box>
			<Box
				mb="1rem"
				w={[
					"90vw",
					"80vw",
					"80vw",
					"3xl",
					"3xl",
				]} /* fix layout foe the next show and video and reviews  */
				//minW={["100vw", "95vw", "85vw", "70vw", "60vw"]}
				align="center"
			>
				{/* Fix AspectRatio issue with Flex children see: https://github.com/chakra-ui/chakra-ui/issues/2582 */}
				<AspectRatio
					maxW="95%"
					ratio={4 / 3}
					border="0.4rem solid"
					borderColor="brown"
				>
					<iframe
						title="Ebo and Genuine Mezziga"
						src="https://www.youtube.com/embed/6tif0ns8jwI"
						allowFullScreen
					/>
				</AspectRatio>
			</Box>
			<HStack spacing="0.4rem" justify="center" align="center">
				<Link
					href="https://www.youtube.com/channel/UCtQCeThNAGW_5MSRdFYX2bQ"
					isExternal
					color="brown"
				>
					See all videos
				</Link>
				<Link
					href="https://www.youtube.com/channel/UCtQCeThNAGW_5MSRdFYX2bQ"
					isExternal
					color="brown"
				>
					<FaExternalLinkAlt fontSize="1rem" />
				</Link>
			</HStack>
		</Box>
	);
};

export default Video;
