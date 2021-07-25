import { Box, Button } from "@chakra-ui/react";

const ButtonUi = (props) => {
  return (
    <Box>
      <Button
        _hover={{ bg: "primary.600" }}
        _active={{
          bg: "primary.700",
          transform: "scale(0.98)",
        }}
        colorScheme="primary"
        variant="solid"
        borderRadius="178"
        fontSize={["sm", "md", "lg"]}
        px={["10px", "14px", "18px"]}
      >
        {props.children}
      </Button>
    </Box>
  );
};

export default ButtonUi;
