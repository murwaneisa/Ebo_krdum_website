import { Box, Text } from "@chakra-ui/react";
import Image from "../UI/Image";

const ReviewHome = () => {
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
			<Image
				src="/images/review/svt.png"
				layout="fill"
				width={45}
				height={46}
			/>
			<Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" mt="6">
				&ldquo;Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
				expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in
				laborum sed rerum et corporis.&rdquo;
			</Text>
		</Box>
	);
};

export default ReviewHome;
