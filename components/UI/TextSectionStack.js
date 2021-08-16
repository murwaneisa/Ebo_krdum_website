import { Stack } from "@chakra-ui/react";

const TextSectionStack = (props) => {
  return (
    <Stack w={["90%", "90%", "70%", "50%", "50%"]} m="0 auto" spacing="1rem">
      {props.children}
    </Stack>
  );
};

export default TextSectionStack;
