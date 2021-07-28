import { Flex } from "@chakra-ui/react";

/*
 * use Chakra UI for styling. to understand Chakra UI props visit the the linke under:
 *https://chakra-ui.com/docs/features/style-props
 */

const Section = (props) => {
	const { h, w, pt, py, px, p, bg } = props;
	return (
		<Flex
			justify="space-around"
			align="center"
			px={px}
			py={py}
			pt={pt}
			p={p}
			w={w}
			h={h}
			direction={["column", "column", "row"]}
			bg={bg}
		>
			{props.children}
		</Flex>
	);
};

export default Section;
