import { Flex } from "@chakra-ui/react";

/*
 * use Chakra UI for styling. to understand Chakra UI props visit the the linke under:
 *https://chakra-ui.com/docs/features/style-props
 */

const Section = ({ children, ...rest }) => {
	return (
		<Flex
			justify="space-around"
			align="center"
			{...rest}
			direction={["column", "column", "row"]}
		>
			{children}
		</Flex>
	);
};

export default Section;
