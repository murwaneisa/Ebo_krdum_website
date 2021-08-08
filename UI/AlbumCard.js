import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import Button from "../UI/Button";
import CustomImage from "../UI/CustomImage";

/*
 * the array of percentage({["10%", "40%"]}) represent the  breakpoint for the element start from mobile to lager screen
 * check the link for more details:
 *https://chakra-ui.com/docs/features/responsive-styles
 */

const Card = (props) => {
  const { title, year, image, id } = props;

  return (
    <Box w={["100%", "80%", "40%", "40%"]}>
      <Box w="100%">
        <CustomImage
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
          <Link href={`/album/${id}`}>
            <a>
              <Button>View Album</Button>
            </a>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default Card;
