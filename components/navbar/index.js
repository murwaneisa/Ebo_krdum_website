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
