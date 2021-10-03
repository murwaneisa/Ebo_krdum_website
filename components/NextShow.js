import {
	Box,
	Flex,
	Heading,
	Link as ChakraLink,
	Stack,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { BiCalendarCheck, BiLocationPlus, BiTimeFive } from "react-icons/bi";
import classes from "../styles/roundImage.module.css";
import ButtonUi from "./UI/Button";
import showImage from "../public/images/ebo-next-show.jpg";

const NextShow = () => {
	return (
		<Flex
			direction={["column", "column", "row"]}
			bg="yellow"
			w={[
				"90vw",
				"80vw",
				"80vw",
				"3xl",
				"3xl",
			]} /* fix layout foe the next show and video and reviews  */
			px={["1rem", "1rem", "1rem", "1rem", "2rem"]}
			py={["2rem", "2rem"]}
			align={["center", "center", "center"]}
			justify="space-evenly"
		>
			{/*image section */}
			<Box
				align="center"
				// border="1px white solid"
				className={classes.image}
			>
				{/* palceholder blur requre the src has imported image */}
				<Image
					src={showImage}
					placeholder="blur"
					alt="Event image"
					width={400}
					height={400}
					objectFit="cover"
					// layout="fill"
				/>
			</Box>
			{/* End of the section */}

			{/* info section */}
			<Stack
				alignItems="center"
				spacing={["2%"]}
				direction="column"
				ml={["0%", "0%", "5%"]}
				mt={["2%", "2%", "0%"]}
				//border="1px solid blue"
				// w="80%"
				align="center"
			>
				<Heading as="h3" size="xl" pb="1rem">
					Folkteatern
				</Heading>
				{/* End of the section */}
				{/* date,time place section */}
				<Stack direction="column" pb="1rem" justify="center">
					<Flex fontSize={["1rem", "1.2rem"]} align="center">
						<BiCalendarCheck />
						<Box pl="0.4rem">2021-10-09</Box>
					</Flex>

					<Flex fontSize={["1rem", "1.2rem"]} align="center">
						<BiTimeFive />
						<Box pl="0.4rem">21:00</Box>
					</Flex>
					<Flex fontSize={["1rem", "1.2rem"]} align="center">
						<BiLocationPlus />
						<Box pl="0.4rem">Gothenburg, Sweden</Box>
					</Flex>
				</Stack>
				{/* End of the section */}
				{/* button and link section */}
				<Stack direction={["column", "row"]}>
					<Box align="center">
						<ChakraLink
							href="https://stayhappening.com/e/konsert-ebo-krdum-E2ISTRVLB16"
							isExternal
						>
							<ButtonUi>Book tickets</ButtonUi>
						</ChakraLink>
					</Box>
					<Flex color="brown" justify="center" align="center">
						<Link href="/shows">
							<a>See all shows</a>
						</Link>
					</Flex>
				</Stack>
				{/* End of the section */}
			</Stack>
		</Flex>
	);
};

export default NextShow;
