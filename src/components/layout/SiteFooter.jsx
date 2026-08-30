import { Box, Flex, Grid, Link, Text } from "@chakra-ui/react";
import { CONTACT, SOCIALS } from "@/data/site";
import { SocialIconLink } from "../common/SocialIcons";

function ColumnLabel({ children }) {
  return (
    <Box
      textStyle="microLabel"
      letterSpacing="0.24em"
      color="bronze"
      mb={{ base: "3", md: "4.5" }}
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
      pt="clamp(3rem,6vw,4.5rem)"
      pb="14"
    >
      {/* stacked on mobile, so the gap is pure vertical space between the four
          blocks and reads much looser there than it does across columns */}
      <Grid
        templateColumns="repeat(auto-fit,minmax(14.375rem,1fr))"
        gap={{ base: "7", md: "11" }}
      >
        <Box>
          <Box
            fontFamily="display"
            fontSize="2xl"
            fontWeight="700"
            letterSpacing="0.1em"
            textTransform="uppercase"
            color="cream"
          >
            Ebo<Box as="span" color="amber">·</Box>Krdum
          </Box>
          <Text
            mt="4"
            textStyle="body"
            lineHeight="1.7"
            color="rgba(247,239,221,0.55)"
            maxW="30ch"
          >
            {CONTACT.tagline}
          </Text>
        </Box>

        <Box>
          <ColumnLabel>Booking &amp; management</ColumnLabel>
          <Link href={`mailto:${CONTACT.booking}`} textStyle="body" display="block" color="rgba(247,239,221,0.72)" css={{ overflowWrap: "anywhere" }}>
            {CONTACT.booking}
          </Link>
        </Box>

        <Box>
          <ColumnLabel>Interviews &amp; shows</ColumnLabel>
          <Link href={`mailto:${CONTACT.press}`} textStyle="body" display="block" color="rgba(247,239,221,0.72)" css={{ overflowWrap: "anywhere" }}>
            {CONTACT.press}
          </Link>
          <Link
            href={CONTACT.phoneHref}
            textStyle="body"
            display="block"
            mt="2"
            color="rgba(247,239,221,0.72)"
          >
            {CONTACT.phone}
          </Link>
        </Box>

        <Box>
          <ColumnLabel>Follow</ColumnLabel>
          <Flex wrap="wrap" gap="2.5">
            {SOCIALS.map((s) => (
              <SocialIconLink key={s.label} {...s} />
            ))}
          </Flex>
        </Box>
      </Grid>

      <Flex
        mt={{ base: "9", md: "14" }}
        pt={{ base: "5", md: "6" }}
        borderTop="1px solid"
        borderColor="rgba(139,90,43,0.4)"
        justify="space-between"
        gap="6"
        wrap="wrap"
        textStyle="meta"
        color="rgba(247,239,221,0.42)"
      >
        <Box>© {new Date().getFullYear()} Ebo Krdum. All rights reserved.</Box>
        <Box>{CONTACT.base}</Box>
      </Flex>
    </Box>
  );
}
