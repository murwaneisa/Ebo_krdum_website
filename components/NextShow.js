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
import CustomImage from "./UI/CustomImage";

const NextShow = () => {
	return (
		<Box w="100vw" align="center">
			<Flex
				direction={["column", "column", "row"]}
				bg="yellow"
				p={["1%", "1%"]}
				mx={["5%", "16%", "15%", "20%", "25%"]}
				mb={["2rem", "6rem"]}
				//border="1px solid red"
			>
				{/*image section */}
				<Box>
					<Image
						src="/images/ebo-next-show2.jpg"
						objectFit="cover"
						width={500}
						height={500}
					/>
				</Box>

				<Stack
					alignItems="center"
					spacing={["2%"]}
					direction="column"
					ml={["0%", "0%", "5%"]}
					mt={["2%", "2%", "0%"]}
					//border="1px solid blue"
					align="center"
				>
					<Heading as="h3" size="xl" pb="1rem">
						FASCHING
					</Heading>
					{/* date,time place section */}
					<Stack direction="column" justify="center" pb="1rem">
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
					</Stack>
					{/* button and link section */}
					<ChakraLink
						href="https://www.fasching.se/ebo-krdum/#2021-09-30T20-00"
						isExternal
					>
						<ButtonUi>Book tickets</ButtonUi>
					</ChakraLink>
					<Box color="brown" align="center" pt="1rem">
						<Link href="/shows">
							<a>See all shows</a>
						</Link>
					</Box>
				</Stack>
			</Flex>
		</Box>
	);
};

export default NextShow;
