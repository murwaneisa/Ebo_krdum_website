import { Box, Text, Flex, VStack, Link } from "@chakra-ui/react";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import Image from "../UI/Image";

const ReviewHome = ({ image, text, name, logoWidth }) => {
	return (
		<Box
			borderWidth="1px"
			borderRadius="md"
			borderColor="brown"
			bg="brown"
			shadow="md"
			align="center"
			maxW="3xl"
			mx="auto"
			px={{
				base: "6",
				md: "8",
			}}
			pt="12"
			pb="16"
		>
			<VStack>
				<Box w="15%">
					<Image src={"/images/review/" + image} layout="fill" />
				</Box>

				<Text as="cite" fontStyle="normal" fontWeight="bold">
					{name}
				</Text>
			</VStack>

			<Text
				//display="inline-flex"
				fontSize={{ base: "xl", md: "2xl" }}
				fontWeight="medium"
				mt="6"
			>
				<ImQuotesLeft />
				{text}
				<ImQuotesRight />
			</Text>
		</Box>
	);
};

export default ReviewHome;
