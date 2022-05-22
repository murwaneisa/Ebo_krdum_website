import React from "react";
import Link from "next/link";
import { Text } from "@chakra-ui/react";

const MenuItem = ({ children, to }) => {
	return (
		<Link href={to}>
			<Text fontWeight={600}>
				<a>{children}</a>
			</Text>
		</Link>
	);
};

export default MenuItem;
