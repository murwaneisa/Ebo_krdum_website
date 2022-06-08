import { Box } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";

export default function Logo(props) {
	return (
		<Box pl={["0", "4", "10"]}>
			<Link href="/">
				<a>
					<Image
						src="/images/logo_white.png"
						alt="Ebo Krdum logo"
						height="20"
						width="100"
					/>
				</a>
			</Link>
		</Box>
	);
}
