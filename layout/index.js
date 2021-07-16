import Nav from "../components/Nav";
import Footer from "../components/Footer";

const Layout = (props) => {
	return (
		<div>
			<Nav />
			{props.children}
			<Footer />
		</div>
	);
};

export default Layout;
