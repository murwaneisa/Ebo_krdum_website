import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";

const ReviewCard = ({ logo, text, name }) => {
  return (
    <Box
      // borderWidth="1px"
      // borderRadius="md"
      // borderColor="brown"
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
      <Box
        w="100%"

        //border="solid 2px blue"
      >
        <Image
          src={"/images/review/" + logo}
          alt="Ebo reviews and testimonial"
          width={100}
          height={100}
          objectFit="contain"
        />
      </Box>

      {/* description box */}
      <Box
        //border="solid 2px black"
        h="auto"
      >
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
          {name}
        </Text>
      </Box>
    </Box>
  );
};

export default ReviewCard;
