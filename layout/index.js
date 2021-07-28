import { Box } from "@chakra-ui/react";
import Footer from "../components/footer/Footer";
import Nav from "../components/Nav";

const Layout = (props) => {
	return (
		<Box>
			<Nav />
			{props.children}
			<Footer />
		</Box>
	);
};

export default Layout;
