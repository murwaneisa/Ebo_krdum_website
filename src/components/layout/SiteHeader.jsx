import NextLink from "next/link";
import { useRouter } from "next/router";
import { Box, Flex, Link } from "@chakra-ui/react";
import { NAV } from "@/data/site";
import MobileNav from "./MobileNav";

/*
 * Sticky translucent header.
 *
 * The six nav links plus the Listen button stop fitting on one line around
 * 850px, so below `lg` the inline nav is replaced by MobileNav's hamburger.
 * Listen stays in the bar at every width — it is the primary action and should
 * not cost an extra tap. Both navs read the same NAV array so they cannot drift.
 */
const linkStyle = {
  fontSize: "sm",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  fontWeight: "500",
};

export default function SiteHeader() {
  const { pathname } = useRouter();

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="50"
      bg="rgba(36,26,16,0.82)"
      borderBottom="1px solid"
      borderColor="rgba(139,90,43,0.45)"
      css={{ backdropFilter: "blur(14px)" }}
    >
      <Flex
        maxW="shell"
        mx="auto"
        px="gutter"
        py={{ base: "2.5", sm: "3.5" }}
        minH={{ base: "16", sm: "20" }}
        align="center"
        justify="space-between"
        wrap="wrap"
        gap={{ base: "0.5rem 0.75rem", sm: "1rem 1.75rem" }}
      >
        {/*
         * The wordmark, Listen and the hamburger together overflow a 320px
         * viewport at the desktop sizes, which wraps the bar onto two lines.
         * Type, tracking and gaps all step down at base to buy that back.
         *
         * textDecoration is pinned off because Chakra's Link defaults to
         * variant="plain", which underlines on hover — and on touch the hover
         * state sticks after a tap, leaving the wordmark permanently underlined.
         */}
        <Link
          asChild
          fontFamily="display"
          fontSize={{ base: "md", sm: "lg", lg: "xl" }}
          fontWeight="700"
          letterSpacing={{ base: "0.1em", sm: "0.12em", lg: "0.16em" }}
          color="cream"
          textTransform="uppercase"
          textDecoration="none"
          _hover={{ color: "cream", textDecoration: "none" }}
        >
          <NextLink href="/">
            Ebo<Box as="span" color="amber">·</Box>Krdum
          </NextLink>
        </Link>

        <Flex
          align="center"
          wrap="wrap"
          gap={{ base: "0.75rem", lg: "0.75rem clamp(1rem,2.4vw,2.125rem)" }}
        >
          <Flex
            as="nav"
            display={{ base: "none", lg: "flex" }}
            align="center"
            wrap="wrap"
            gap="0.75rem clamp(1rem,2.4vw,2.125rem)"
          >
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  asChild
                  {...linkStyle}
                  color={active ? "cream" : "rgba(247,239,221,0.68)"}
                  _hover={{ color: "amberBright" }}
                >
                  <NextLink href={item.href}>{item.label}</NextLink>
                </Link>
              );
            })}
          </Flex>

          <Link
            asChild
            {...linkStyle}
            letterSpacing="0.12em"
            fontWeight="600"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            flex="0 0 auto"
            whiteSpace="nowrap"
            minH="12"
            color="ink"
            bg="amber"
            px={{ base: "3.5", sm: "5" }}
            borderRadius="2px"
            textDecoration="none"
            _hover={{ bg: "amberBright", color: "ink", textDecoration: "none" }}
          >
            <NextLink href="/#listen">Listen</NextLink>
          </Link>

          <MobileNav />
        </Flex>
      </Flex>
    </Box>
  );
}
