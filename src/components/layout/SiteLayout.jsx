import Head from "next/head";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { system } from "@/styles/system";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

/*
 * Layout for pages on the new design. Mounted via `Page.getLayout` in _app.js so
 * the Chakra v3 provider is never live at the same time as the legacy v1 one.
 */
export default function SiteLayout({ children, title, description }) {
  const pageTitle = title ? `${title} — Ebo Krdum` : "Ebo Krdum";
  const desc =
    description ||
    "Swedish Grammis award winner, Sudanese-Swedish troubadour — desert blues from Swedish soil.";

  return (
    <ChakraProvider value={system}>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={desc} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={pageTitle} key="ogtitle" />
        <meta property="og:description" content={desc} key="ogdesc" />
        <meta property="og:image" content="/images/ebo-og.jpg" key="ogimage" />
        <meta property="og:site_name" content="Ebo Krdum Official Webpage" key="ogsitename" />
      </Head>
      <Box bg="ink" fontFamily="body" color="cream" overflowX="hidden">
        <SiteHeader />
        {children}
        <SiteFooter />
      </Box>
    </ChakraProvider>
  );
}

/** Convenience helper for pages: `Page.getLayout = withSiteLayout({ title })` */
export const withSiteLayout = (props = {}) =>
  function getLayout(page) {
    return <SiteLayout {...props}>{page}</SiteLayout>;
  };
