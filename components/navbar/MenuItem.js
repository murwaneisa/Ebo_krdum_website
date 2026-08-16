import React from "react";
import Link from "next/link";
import { Text } from "@chakra-ui/react";

const MenuItem = ({ children, to }) => {
	return (
		<Link href={to}>
			<Text as="span" cursor="pointer" fontWeight={600}>
				{children}
			</Text>
		</Link>
	);
};

export default MenuItem;
