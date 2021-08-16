import { Text } from "@chakra-ui/react";

const CustomCiteText = (props) => {
  return (
    <Text>
      <Text as="strong">Quoting Ebo: </Text>
      <Text as="cite">{props.children}</Text>
    </Text>
  );
};

export default CustomCiteText;
