import { Flex } from "@chakra-ui/react";
import Title from "../UI/Title";

/*
 * use Chakra UI for styling. to understand Chakra UI props visit the the linke under:
 *https://chakra-ui.com/docs/features/style-props
 */

const Section = ({ title, children, ...rest }) => {
	return (
		<>
			<Flex
				justify="space-around"
				align="center"
				{...rest}
				direction="column"
				w="100vw"
			>
				<Title>{title}</Title>
				{/* this flex is not reusable due to the props. need to fex */}
				<Flex
					align="center"
					justify="space-between"
					direction={["column", "column", "row"]}
				>
					{children}
				</Flex>
			</Flex>
		</>
	);
};

export default Section;
