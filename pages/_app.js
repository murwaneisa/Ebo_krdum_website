import { ChakraProvider, CSSReset } from "@chakra-ui/react";
/* Components */
import Layout from "../layout";
import "../styles/globals.css";
import theme from "../styles/theme";

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider theme={theme}>
			<Layout>
				<CSSReset />
				<Component {...pageProps} />
			</Layout>
		</ChakraProvider>
	);
}

export default MyApp;
