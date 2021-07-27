import { Flex } from "@chakra-ui/react";

/*
 * use Chakra UI for styling. to understand Chakra UI props visit the the linke under:
 *https://chakra-ui.com/docs/features/style-props
 */

const Section = (props) => {
	const { pt, pr, pb, pl, bg } = props;
	return (
		<Flex
			justify="center"
			pt={pt}
			pr={pr}
			pl={pl}
			pb={pb}
			w="100%"
			h={["20rem", "35rem", "43.375rem"]}
			direction={["column", "row"]}
			bg={bg}
		>
			{props.children}
		</Flex>
	);
};

export default Section;
