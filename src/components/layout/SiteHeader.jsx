import NextLink from "next/link";
import { useRouter } from "next/router";
import { Box, Flex, Link } from "@chakra-ui/react";
import { NAV } from "@/data/site";

/*
 * Sticky translucent header. The design has no separate mobile menu — the nav
 * simply wraps onto a second line via flex-wrap, so that behaviour is preserved
 * here rather than introducing a drawer the design never had.
 */
const linkStyle = {
  fontSize: "13px",
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
        py="14px"
        minH="76px"
        align="center"
        justify="space-between"
        wrap="wrap"
        gap="16px 28px"
      >
        <Link
          asChild
          fontFamily="display"
          fontSize="22px"
          fontWeight="700"
          letterSpacing="0.16em"
          color="cream"
          textTransform="uppercase"
          _hover={{ color: "cream" }}
        >
          <NextLink href="/">
            Ebo<Box as="span" color="amber">·</Box>Krdum
          </NextLink>
        </Link>

        <Flex as="nav" align="center" wrap="wrap" gap="12px clamp(16px,2.4vw,34px)">
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
          <Link
            asChild
            {...linkStyle}
            letterSpacing="0.12em"
            fontWeight="600"
            color="ink"
            bg="amber"
            px="20px"
            py="11px"
            borderRadius="2px"
            _hover={{ bg: "amberBright", color: "ink" }}
          >
            <NextLink href="/#listen">Listen</NextLink>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
