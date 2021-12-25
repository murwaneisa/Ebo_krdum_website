import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";

const ReviewCard = ({ logo, text, name, language }) => {
  return (
    <Box
      bg="brown"
      shadow="md"
      align="center"
      maxW="3xl"
      h={["490px", "460px", "460px", "460px", "460px"]}
      mx="auto"
      p={{
        base: "6",
        md: "8",
      }}
    >
      <Box w="100%">
        <Image
          src={"/images/review/" + logo}
          alt="Ebo reviews and testimonial"
          width={100}
          height={100}
          objectFit="contain"
        />
      </Box>

      {/* description box */}
      <Box h="auto">
        <Text
          fontSize={{ base: "sm", sm: "md", md: "lg", lg: "xl" }}
          fontWeight="medium"
        >
          <ImQuotesLeft />
          {text}
          <ImQuotesRight />
        </Text>
      </Box>
      <Box pt={["1rem"]}>
        <Text as="cite" fontStyle="normal" fontWeight="bold">
          Review by {name}, written in {language}
        </Text>
      </Box>
    </Box>
  );
};

export default ReviewCard;
