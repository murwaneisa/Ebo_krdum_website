import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

const Card = (props) => {
	const { title, year, image } = props;
	return (
		<Box w={["100%", "50%", "31%"]}>
			<Box w="100%" h="70%">
				<Image
					src={`/images${image}`}
					width={450}
					height={450}
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
