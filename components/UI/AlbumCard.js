import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { imageCDN } from "../../lib/imageCdnFn";
import Button from "../UI/Button";
import CustomImage from "../UI/CustomImage";
import Image from "next/image";

/*
 * the array of percentage({["10%", "40%"]}) represent the  breakpoint for the element start from mobile to lager screen
 * check the link for more details:
 *https://chakra-ui.com/docs/features/responsive-styles
 */

const Card = (props) => {
  const { title, year, image, slug } = props;
  const imageFromSanity = imageCDN(image.itemImage);
  return (
    <Box w={["100%", "80%", "40%", "40%"]}>
      <Box w="100%" mb="0%">
        <CustomImage
          src={imageFromSanity}
          alt={image.photoAlt}
          layout="fill"
          objectFit="cover"
          quality="20"
        />
      </Box>
      <Flex
        justify="space-between"
        direction={["space-between", "column"]}
        mt="1%"
        align={["center", "start"]}
      >
        <Flex
          direction="column"
          //border="2px solid blue"
          fontSize="1rem"
          flexGrow={1}
          h={["0rem", "1rem", "2rem", "5rem"]}
          mb="2rem"
        >
          {" "}
          <Text
            fontSize={["sm", "md", "sm", "sm", "2xl"]}
          >{`Title: ${title}`}</Text>
          <Text
            fontSize={["sm", "sm", "sm", "sm", "2xl"]}
          >{`Released: ${year}`}</Text>
        </Flex>

        <Box>
          <Link href={`/album/${slug}`}>
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
