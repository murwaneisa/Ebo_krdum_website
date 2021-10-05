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
        <title>Ebo Krdum</title>
        <meta
          name="description"
          content="This is the official website of Ebo Krdum"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* Open Graph */}
        <meta property="og:url" content="www.ebokrdum.com" key="ogurl" />
        <meta property="og:image" content="/images/ebo-og.jpg" key="ogimage" />
        <meta
          property="og:site_name"
          content="Ebo Krdum Official Webpage"
          key="ogsitename"
        />
        <meta property="og:title" content="Ebo Krdum" key="ogtitle" />
        <meta
          property="og:description"
          content="This is the official website of Ebo Krdum"
          key="ogdesc"
        />
      </Head>
      <Layout>
        <CSSReset />
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
