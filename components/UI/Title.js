import { Heading } from "@chakra-ui/react";
const Title = (props) => {
  return (
    <Heading
      as="h2"
      size={["2xl", "2xl", "3xl", "3xl"]}
      fontSize={["1.6rem", "2.4rem", "3rem", "4rem"]}
      pb="1.8rem"
      isTruncated
    >
      {props.children}
    </Heading>
  );
};

export default Title;
