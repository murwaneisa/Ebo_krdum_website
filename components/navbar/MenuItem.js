import React from "react";
import Link from "next/link";
import { Text } from "@chakra-ui/react";

const MenuItem = ({ children, to }) => {
	return (
		<Link href={to}>
			<Text
				cursor="pointer"
				fontWeight={600}
				fontSize={["1rem", "1rem", "1rem", "1rem", "1rem", "2rem", "3rem"]}
			>
				<a>{children}</a>
			</Text>
		</Link>
	);
};

export default MenuItem;
