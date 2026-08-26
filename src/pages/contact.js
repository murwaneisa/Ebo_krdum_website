import { Box, Flex, Grid, Heading, Link, Text } from "@chakra-ui/react";
import { withSiteLayout } from "@/components/layout/SiteLayout";
import FilmStrip from "@/components/common/FilmStrip";
import PortraitFrame from "@/components/common/PortraitFrame";
import { CONTACT } from "@/data/site";

const CARDS = [
  {
    label: "Booking & management",
    value: CONTACT.booking,
    href: `mailto:${CONTACT.booking}`,
    note: "Fees, availability, riders and travel.",
  },
  {
    label: "Press & interviews",
    value: CONTACT.press,
    href: `mailto:${CONTACT.press}`,
    note: "Photos, bio and quotes on request.",
  },
  {
    label: "Phone",
    value: CONTACT.phone,
    href: CONTACT.phoneHref,
    note: "Weekdays, 09–17 CET.",
  },
  { label: "Based in", value: CONTACT.base, note: "Touring across Sweden and Europe." },
];

function ContactCard({ label, value, href, note }) {
  /*
   * colour lives here, not on the branches below: without it the linked cards
   * inherit the global amber `a` rule while the one card with no href stays
   * cream, so the same slot rendered two different colours.
   */
  const valueStyle = {
    display: "block",
    mt: "4",
    fontFamily: "display",
    fontSize: "lg",
    lineHeight: "1.35",
    color: "cream",
    css: { wordBreak: "break-word" },
  };

  return (
    <Box bg="surface" p="clamp(1.375rem,2.6vw,2.125rem)" boxShadow="0 0 0 1px rgba(139,90,43,0.45)">
      <Box textStyle="microLabel" letterSpacing="0.24em" color="bronze">
        {label}
      </Box>
      {href ? (
        <Link href={href} {...valueStyle}>
          {value}
        </Link>
      ) : (
        <Box {...valueStyle}>{value}</Box>
      )}
      <Text mt="3.5" textStyle="meta" lineHeight="1.65" color="rgba(247,239,221,0.55)">
        {note}
      </Text>
    </Box>
  );
}

export default function Contact() {
  return (
    <>
      <Box as="section" maxW="shell" mx="auto" pt="clamp(2.5rem,6vw,4rem)" px="gutter">
        <Flex wrap="wrap" align="flex-end" gap="1.5rem clamp(1.5rem,3vw,3rem)">
          <Heading
            as="h1"
            flex="1 1 23.75rem"
            minW="0"
            textStyle="pageTitle"
            lineHeight="0.9"
            m="0"
            color="cream"
          >
            Get in
            <br />
            <Box as="span" fontStyle="italic" color="amberBright">
              touch
            </Box>
          </Heading>
          <Text
            flex="1 1 17.5rem"
            minW="0"
            maxW="44ch"
            mb="2.5"
            textStyle="body"
            lineHeight="1.7"
            color="rgba(247,239,221,0.68)"
            css={{ textWrap: "pretty" }}
          >
            Booking for festivals, clubs and cultural houses — solo, trio or full
            band. Press requests, interviews and stage plots handled by the same
            team.
          </Text>
        </Flex>
        <FilmStrip mt="clamp(2rem,4.5vw,3.25rem)" />
      </Box>

      <Box as="section" maxW="shell" mx="auto" pt="clamp(2.25rem,5vw,4rem)" px="gutter">
        <Grid
          templateColumns="repeat(auto-fit,minmax(20rem,1fr))"
          gap="1px"
          bg="surface"
          border="1px solid"
          borderColor="rgba(139,90,43,0.45)"
        >
          {CARDS.map((c) => (
            <ContactCard key={c.label} {...c} />
          ))}
        </Grid>
      </Box>

      <Box as="section" maxW="shell" mx="auto" pt="clamp(2.75rem,6vw,5rem)" px="gutter">
        <Flex wrap="wrap" gap="clamp(1.75rem,4vw,3.5rem)" align="stretch">
          <Box flex="1 1 26.25rem" minW="0">
            <Heading
              as="h2"
              textStyle="sectionSm"
              m="0"
              color="cream"
            >
              Booking enquiry
            </Heading>
            <Text
              mt="3.5"
              textStyle="body"
              lineHeight="1.7"
              color="rgba(247,239,221,0.6)"
              maxW="52ch"
              css={{ textWrap: "pretty" }}
            >
              Write directly with the date, the city and the room — include
              capacity, budget range and line-up if you know them. Answers within a
              few working days.
            </Text>

            <Flex mt="7" wrap="wrap" gap="0.875rem 1.125rem">
              <Link
                href={`mailto:${CONTACT.booking}?subject=${encodeURIComponent("Booking enquiry — Ebo Krdum")}`}
                display="inline-flex"
                alignItems="center"
                textStyle="microLabel"
                letterSpacing="0.14em"
                fontWeight="600"
                color="ink"
                bg="amber"
                px="8"
                py="4.5"
                minH="14"
                _hover={{ bg: "amberBright", color: "ink" }}
              >
                Email management →
              </Link>
              <Link
                href={CONTACT.phoneHref}
                display="inline-flex"
                alignItems="center"
                textStyle="microLabel"
                letterSpacing="0.14em"
                fontWeight="600"
                color="amber"
                border="1px solid"
                borderColor="rgba(232,169,58,0.6)"
                px="7"
                py="4.5"
                minH="14"
                _hover={{ color: "ink", bg: "amber" }}
              >
                Call {CONTACT.phone}
              </Link>
            </Flex>

            <Box
              mt="clamp(1.75rem,3.5vw,2.75rem)"
              borderTop="1px solid"
              borderColor="rgba(139,90,43,0.45)"
              pt="6"
              maxW="52ch"
            >
              <Box textStyle="microLabel" letterSpacing="0.24em" color="bronze">
                Useful to include
              </Box>
              <Text mt="3" textStyle="body" color="rgba(247,239,221,0.62)">
                Date and city · venue name and capacity · solo, trio or full band ·
                budget range · whether backline and sound are provided.
              </Text>
            </Box>
          </Box>

          <Box as="figure" flex="1 1 clamp(17.5rem,30vw,27.5rem)" maxW="32.5rem" m="0">
            <PortraitFrame
              src={null}
              alt="Ebo Krdum performing with his band at a festival"
              ratio="4/3"
              minH="clamp(17.5rem,42vw,32.5rem)"
            />
            <Box
              as="figcaption"
              mt="3.5"
              textStyle="eyebrow"
              letterSpacing="0.14em"
              color="rgba(247,239,221,0.6)"
            >
              Live at Världsmusikfestivalen
            </Box>
          </Box>
        </Flex>
        <FilmStrip mt="clamp(3rem,6vw,5rem)" />
      </Box>
    </>
  );
}

Contact.getLayout = withSiteLayout({
  title: "Contact",
  description:
    "Booking, press and interview contacts for Ebo Krdum — solo, trio or full band.",
});
