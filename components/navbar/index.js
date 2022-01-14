import { Box, HStack, Stack, Flex, IconButton } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Image from "next/image";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { useState } from "react";
import NavbarContainer from "./navbarContainer";
import Logo from "./Logo";
import MenuToggle from "./menuToggle";
import MenuItemContainer from "./menuItemContainer";

const Nav = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<NavbarContainer>
			<Logo />
			<MenuToggle toggle={toggle} isOpen={isOpen} />
			<MenuItemContainer isOpen={isOpen} />
		</NavbarContainer>
	);
};

export default Nav;
