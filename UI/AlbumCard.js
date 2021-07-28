import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "../UI/Image";

const Card = (props) => {
	const { title, year, image } = props;
	return (
		<Box w={["100%", "50%", "31%"]}>
			<Box w="100%" h="70%">
				<Image
					src={`/images${image}`}
					layout="fill"
					width="100%"
					objectFit="cover"
				/>
			</Box>
			<Flex>
				<Text>{`Title:${title}`}</Text>
				<Text>{`Date:${year}`}</Text>
			</Flex>
		</Box>
	);
};

export default Card;
