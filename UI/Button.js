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
				fontSize={["xs", "sm", "md", "lg"]}
				px={["0.8rem", "0.7rem", "0.8rem", "1.2rem"]}
				py={["0.4rem", "0.7rem", "0.8rem", "1.2rem"]}
			>
				{props.children}
			</Button>
		</Box>
	);
};

export default ButtonUi;
