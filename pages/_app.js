import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
/* Components */
import Layout from "../layout";

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ChakraProvider>
	);
}

export default MyApp;
