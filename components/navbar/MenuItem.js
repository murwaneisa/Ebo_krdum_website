import React from "react";
import Link from "next/link";

const MenuItem = ({ children, to }) => {
	return (
		<Link href={to}>
			<a>{children}</a>
		</Link>
	);
};

export default MenuItem;
