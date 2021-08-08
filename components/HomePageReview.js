import { Box, Text, VStack } from "@chakra-ui/react";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import CustomImage from "../UI/CustomImage";

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
          <CustomImage
            src={"/images/review/" + image}
            alt="Ebo reviews and testimonial"
            layout="fill"
          />
        </Box>

        <Text as="cite" fontStyle="normal" fontWeight="bold">
          {name}
        </Text>
      </VStack>

      <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" mt="6">
        <ImQuotesLeft />
        {text}
        <ImQuotesRight />
      </Text>
    </Box>
  );
};

export default ReviewHome;
