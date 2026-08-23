import { Box, Flex, Grid, Link, Text } from "@chakra-ui/react";
import { CONTACT, SOCIALS } from "@/data/site";
import { SocialIconLink } from "../common/SocialIcons";

function ColumnLabel({ children }) {
  return (
    <Box
      fontSize="11px"
      letterSpacing="0.24em"
      textTransform="uppercase"
      color="bronze"
      mb="18px"
    >
      {children}
    </Box>
  );
}

export default function SiteFooter() {
  return (
    <Box
      as="footer"
      maxW="shell"
      mx="auto"
      px="gutter"
      pt="clamp(48px,6vw,72px)"
      pb="56px"
    >
      <Grid templateColumns="repeat(auto-fit,minmax(230px,1fr))" gap="44px">
        <Box>
          <Box
            fontFamily="display"
            fontSize="30px"
            fontWeight="700"
            letterSpacing="0.1em"
            textTransform="uppercase"
            color="cream"
          >
            Ebo<Box as="span" color="amber">·</Box>Krdum
          </Box>
          <Text
            mt="16px"
            fontSize="15px"
            lineHeight="1.7"
            color="rgba(247,239,221,0.55)"
            maxW="30ch"
          >
            {CONTACT.tagline}
          </Text>
        </Box>

        <Box>
          <ColumnLabel>Booking &amp; management</ColumnLabel>
          <Link href={`mailto:${CONTACT.booking}`} fontSize="16px" display="block" css={{ overflowWrap: "anywhere" }}>
            {CONTACT.booking}
          </Link>
        </Box>

        <Box>
          <ColumnLabel>Interviews &amp; shows</ColumnLabel>
          <Link href={`mailto:${CONTACT.press}`} fontSize="16px" display="block" css={{ overflowWrap: "anywhere" }}>
            {CONTACT.press}
          </Link>
          <Link
            href={CONTACT.phoneHref}
            fontSize="16px"
            display="block"
            mt="8px"
            color="rgba(247,239,221,0.72)"
          >
            {CONTACT.phone}
          </Link>
        </Box>

        <Box>
          <ColumnLabel>Follow</ColumnLabel>
          <Flex wrap="wrap" gap="10px">
            {SOCIALS.map((s) => (
              <SocialIconLink key={s.label} {...s} />
            ))}
          </Flex>
        </Box>
      </Grid>

      <Flex
        mt="56px"
        pt="24px"
        borderTop="1px solid"
        borderColor="rgba(139,90,43,0.4)"
        justify="space-between"
        gap="24px"
        wrap="wrap"
        fontSize="13px"
        color="rgba(247,239,221,0.42)"
      >
        <Box>© {new Date().getFullYear()} Ebo Krdum. All rights reserved.</Box>
        <Box>{CONTACT.base}</Box>
      </Flex>
    </Box>
  );
}
