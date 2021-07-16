import Link from "next/link";
import { Flex } from "@chakra-ui/react";

const Nav = () => {
	return (
		<Flex justify="space-between">
			<Link href="/">
				<a>Ebo Krdum</a>
			</Link>
			<div>
				<Link href="/">
					<a>Home</a>
				</Link>
				<Link href="/biography">
					<a>Biography</a>
				</Link>
				<Link href="/shows">
					<a>Shows</a>
				</Link>
			</div>
		</Flex>
	);
};

export default Nav;
