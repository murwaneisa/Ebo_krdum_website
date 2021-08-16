import { Heading } from "@chakra-ui/react";

const CustomH4 = (props) => {
  return (
    <Heading as="h4" size="md">
      {props.children}
    </Heading>
  );
};

export default CustomH4;
