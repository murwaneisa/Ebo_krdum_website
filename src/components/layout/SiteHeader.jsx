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
        py="3.5"
        minH="20"
        align="center"
        justify="space-between"
        wrap="wrap"
        gap="1rem 1.75rem"
      >
        <Link
          asChild
          fontFamily="display"
          // At 360px the wordmark, Listen and the hamburger add up to just over
          // the viewport at xl, which wraps the bar onto two lines.
          fontSize={{ base: "lg", lg: "xl" }}
          fontWeight="700"
          letterSpacing={{ base: "0.12em", lg: "0.16em" }}
          color="cream"
          textTransform="uppercase"
          _hover={{ color: "cream" }}
        >
          <NextLink href="/">
            Ebo<Box as="span" color="amber">·</Box>Krdum
          </NextLink>
        </Link>

        <Flex align="center" wrap="wrap" gap="0.75rem clamp(1rem,2.4vw,2.125rem)">
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
            minH="12"
            color="ink"
            bg="amber"
            px="5"
            borderRadius="2px"
            _hover={{ bg: "amberBright", color: "ink" }}
          >
            <NextLink href="/#listen">Listen</NextLink>
          </Link>

          <MobileNav />
        </Flex>
      </Flex>
    </Box>
  );
}
