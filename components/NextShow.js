import { Box, Stack, Heading, HStack, Flex, Link } from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { BiTimeFive, BiCalendarCheck, BiLocationPlus } from "react-icons/bi";
import ButtonUi from "../UI/Button";

const NextShow = () => {
	return (
		<Box w="100vw" align="center" justify="center">
			<Stack
				bg="yellow"
				p={["10%", "5%"]}
				mx={["5%", "10%", "20%"]}
				mb={["2rem", "6rem"]}
				spacing="20px"
			>
				<Heading as="h3" size="xl" pb="1rem">
					FASCHING
				</Heading>
				<Stack
					justify="center"
					spacing={["2%", "10%", "15%"]}
					direction={["column", "row"]}
				>
					<Flex
						fontSize={["1rem", "1.2rem"]}
						align="center"
						justify={["center", "center"]}
					>
						<BiCalendarCheck />
						<Box pl="0.4rem">2021-Aug-25</Box>
					</Flex>

					<Flex fontSize={["1rem", "1.2rem"]} align="center" justify="center">
						<BiTimeFive />
						<Box pl="0.4rem">18:00 - 21:00</Box>
					</Flex>
				</Stack>
				<Flex
					fontSize={["1rem", "1.2rem"]}
					align="center"
					justify={["center", "center"]}
				>
					<BiLocationPlus />
					<Box pl="0.4rem">2021-Aug-25</Box>
				</Flex>
				<ButtonUi>Book tickets</ButtonUi>
				<HStack spacing="0.4rem" justify="center" align="center">
					<Link
						/* change the link */
						href="https://www.youtube.com/channel/UCtQCeThNAGW_5MSRdFYX2bQ"
						isExternal
						color="brown"
					>
						See all shows
					</Link>
					<Link
						/* change the link */
						href="https://www.youtube.com/channel/UCtQCeThNAGW_5MSRdFYX2bQ"
						isExternal
						color="brown"
					>
						<FaExternalLinkAlt fontSize="1rem" />
					</Link>
				</HStack>
			</Stack>
		</Box>
	);
};

export default NextShow;
