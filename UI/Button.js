import { Button, Text } from "@chakra-ui/react";

const ButtonUi = (props) => {
	return (
		<div>
			<Button
				_hover={{ bg: "primary.600" }}
				_active={{
					bg: "primary.700",
					transform: "scale(0.98)",
				}}
				colorScheme="primary"
				variant="solid"
				borderRadius="178"
			>
				{props.children}
			</Button>
		</div>
	);
};

export default ButtonUi;
