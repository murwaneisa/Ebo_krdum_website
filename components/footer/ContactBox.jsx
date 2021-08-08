import { Box, Stack, Text } from "@chakra-ui/react";
import * as React from "react";
import { FooterHeading } from "./FooterHeading";

export const ContactBox = (props) => {
	return (
		<Box>
			<Stack spacing="4">
				<FooterHeading>Contacts</FooterHeading>
				<Text>
					<a href="tel:+46737401711">+46 737 40 17 11</a>
				</Text>
				<Text>
					<a href="mailto:ebomekrdum@gmail.com">ebomekrdum@gmail.com</a>
				</Text>
			</Stack>
		</Box>
	);
};
