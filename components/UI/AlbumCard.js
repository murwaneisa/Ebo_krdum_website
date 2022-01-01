import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { imageCDN } from "../../lib/imageCdnFn";
import Button from "../UI/Button";
import CustomImage from "../UI/CustomImage";

/*
 * the array of percentage({["10%", "40%"]}) represent the  breakpoint for the element start from mobile to lager screen
 * check the link for more details:
 *https://chakra-ui.com/docs/features/responsive-styles
 */

const Card = (props) => {
  const { title, year, image, id } = props;
  const imageFromSanity = imageCDN(image.itemImage);
  return (
    <Box w={["100%", "80%", "40%", "40%"]}>
      <Box w="100%">
        <CustomImage
          src={imageFromSanity}
          alt={image.photoAlt}
          layout="fill"
          width="100%"
          objectFit="cover"
          quality="20"
        />
      </Box>
      <Flex justify="space-between" align="center" py="1rem">
        <Flex direction="column" fontSize="1rem">
          {" "}
          <Text
            fontSize={["sm", "md", "sm", "sm", "2xl"]}
          >{`Title: ${title}`}</Text>
          <Text
            fontSize={["sm", "sm", "sm", "sm", "2xl"]}
          >{`Released: ${year}`}</Text>
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
