import {
	Box,
	Flex,
	Heading,
	Link as ChakraLink,
	Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import { BiCalendarCheck, BiLocationPlus, BiTimeFive } from "react-icons/bi";
import ButtonUi from "./UI/Button";
import Image from "next/image";

const NextShow = () => {
	return (
		<Box w="100vw" align="center">
			<Stack
				direction={["column", "column", "row"]}
				bg="yellow"
				p={["1%", "1%", "5%"]}
				mx={["5%", "10%", "20%"]}
				mb={["2rem", "6rem"]}
				//spacing="20px"
				//border="1px solid red"
			>
				<Box>
					<Image
						src="/images/salam.jpg"
						objectFit="contain"
						width={500}
						height={500}
					/>
				</Box>
				<Stack
					alignItems="center"
					spacing={["2%"]}
					direction="column"
					border="1px solid blue"
				>
					<Heading as="h3" size="xl" pb="1rem">
						FASCHING
					</Heading>
					<Flex direction="column" justify="center">
						<Flex fontSize={["1rem", "1.2rem"]} align="center">
							<BiCalendarCheck />
							<Box pl="0.4rem">2021-SPE-30</Box>
						</Flex>

						<Flex fontSize={["1rem", "1.2rem"]} align="center">
							<BiTimeFive />
							<Box pl="0.4rem">20:00</Box>
						</Flex>
						<Flex fontSize={["1rem", "1.2rem"]} align="center">
							<BiLocationPlus />
							<Box pl="0.4rem">Kungsgatan 63, Stockholm</Box>
						</Flex>
					</Flex>

					<ChakraLink
						href="https://www.fasching.se/ebo-krdum/#2021-09-30T20-00"
						isExternal
					>
						<ButtonUi>Book tickets</ButtonUi>
					</ChakraLink>
					<Box color="brown" align="center">
						<Link href="/shows">
							<a>See all shows</a>
						</Link>
					</Box>
				</Stack>
			</Stack>
		</Box>
	);
};

export default NextShow;
