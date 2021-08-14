import { Box, Text, VStack } from "@chakra-ui/react";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import Image from "next/image";

const ReviewCard = ({ logo, text, name }) => {
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
			p={{
				base: "6",
				md: "8",
			}}
		>
			<Box
				w="100%"
				h={["18vh", "12vh"]}
				//border="solid 2px blue"
			>
				<VStack>
					<Box w={["100px", "200px"]}>
						<Image
							src={"/images/review/" + logo}
							alt="Ebo reviews and testimonial"
							width={100}
							height={100}
							objectFit="contain"
						/>
					</Box>
				</VStack>
			</Box>
			{/* description box */}
			<Box
				//border="solid 2px black"
				h="auto"
			>
				<Text fontSize={{ base: "sm", md: "lg", lg: "xl" }} fontWeight="medium">
					<ImQuotesLeft />
					{text}
					<ImQuotesRight />
				</Text>
			</Box>
			<Box pt={["1rem"]}>
				<Text as="cite" fontStyle="normal" fontWeight="bold">
					{name}
				</Text>
			</Box>
		</Box>
	);
};

export default ReviewCard;
