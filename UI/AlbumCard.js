import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "../UI/Image";
import Button from "../UI/Button";

/*
 * the array of percentage({["10%", "40%"]}) represent the  breakpoint for the element start from mobile to lager screen
 * check the link for more details:
 *https://chakra-ui.com/docs/features/responsive-styles
 */

const Card = (props) => {
	const { title, year, image } = props;
	return (
		<Box w={["100%", "80%", "40%", "31%"]}>
			<Box w="100%">
				<Image
					src={`/images${image}`}
					layout="fill"
					width="100%"
					objectFit="cover"
				/>
			</Box>
			<Flex justify="space-between" align="center" py="1rem">
				<Flex direction="column" fontSize="1rem">
					{" "}
					<Text>{`Title:${title}`}</Text>
					<Text>{`Date:${year}`}</Text>
				</Flex>

				<Box>
					<Button>View Album</Button>
				</Box>
			</Flex>
		</Box>
	);
};

export default Card;
