import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import Head from "next/head";
/* Components */
import Layout from "../layout";
import "../styles/globals.css";
import theme from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Ebo</title>
        <meta
          name="description"
          content="This is the official website of Ebo Krdum"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <CSSReset />
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
