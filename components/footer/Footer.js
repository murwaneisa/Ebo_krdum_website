import Link from "next/link";
import Image from "next/Image";
import { Box, Stack, StackDivider } from "@chakra-ui/react";
import * as React from "react";
import { Copyright } from "./Copyright";
import { LinkGrid } from "./LinkGrid";
import { SocialMediaLinks } from "./SocialMediaLinks";
import { ContactBox } from "./ContactBox";

// Design and Code for Footer attributed to Chakra UI Pro free template: https://pro.chakra-ui.com/components/marketing/footers

const Footer = () => {
	return (
		<Box
			as="footer"
			role="contentinfo"
			mx="auto"
			maxW="vw"
			py="12"
			px={{
				base: "4",
				md: "8",
			}}
			bgColor="brown"
		>
			<Stack spacing="10" divider={<StackDivider />}>
				<Stack
					direction={{
						base: "column",
						lg: "row",
					}}
					spacing={{
						base: "10",
						lg: "28",
					}}
				>
					<Box flex="1">
						<Link href="/">
							<a>
								<Image
									src="/images/logo_white.png"
									alt="Ebo krdum logo"
									height="20"
									width="100"
								/>
							</a>
						</Link>
					</Box>
					<Stack
						direction={{
							base: "column",
							md: "row",
						}}
						spacing={{
							base: "10",
							md: "20",
						}}
					>
						<LinkGrid
							spacing={{
								base: "10",
								md: "20",
								lg: "28",
							}}
							flex="1"
						/>
						<ContactBox
							width={{
								base: "full",
								md: "sm",
							}}
						/>
					</Stack>
				</Stack>
				<Stack
					direction={{
						base: "column-reverse",
						md: "row",
					}}
					justifyContent="space-between"
					alignItems="center"
				>
					<Copyright />
					<SocialMediaLinks />
				</Stack>
			</Stack>
		</Box>
	);
};

export default Footer;
