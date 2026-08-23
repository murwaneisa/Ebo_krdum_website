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
  const valueStyle = {
    display: "block",
    mt: "16px",
    fontFamily: "display",
    fontSize: "clamp(17px,1.6vw,21px)",
    lineHeight: "1.35",
    css: { wordBreak: "break-word" },
  };

  return (
    <Box bg="surface" p="clamp(22px,2.6vw,34px)" boxShadow="0 0 0 1px rgba(139,90,43,0.45)">
      <Box fontSize="11px" letterSpacing="0.24em" textTransform="uppercase" color="bronze">
        {label}
      </Box>
      {href ? (
        <Link href={href} {...valueStyle}>
          {value}
        </Link>
      ) : (
        <Box {...valueStyle} color="cream">
          {value}
        </Box>
      )}
      <Text mt="14px" fontSize="14px" lineHeight="1.65" color="rgba(247,239,221,0.55)">
        {note}
      </Text>
    </Box>
  );
}

export default function Contact() {
  return (
    <>
      <Box as="section" maxW="shell" mx="auto" pt="clamp(40px,6vw,64px)" px="gutter">
        <Flex wrap="wrap" align="flex-end" gap="24px clamp(24px,3vw,48px)">
          <Heading
            as="h1"
            flex="1 1 380px"
            minW="0"
            fontFamily="display"
            fontWeight="600"
            fontSize="clamp(44px,7vw,104px)"
            lineHeight="0.9"
            letterSpacing="-0.02em"
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
            flex="1 1 280px"
            minW="0"
            maxW="44ch"
            mb="10px"
            fontSize="16px"
            lineHeight="1.7"
            color="rgba(247,239,221,0.68)"
            css={{ textWrap: "pretty" }}
          >
            Booking for festivals, clubs and cultural houses — solo, trio or full
            band. Press requests, interviews and stage plots handled by the same
            team.
          </Text>
        </Flex>
        <FilmStrip mt="clamp(32px,4.5vw,52px)" />
      </Box>

      <Box as="section" maxW="shell" mx="auto" pt="clamp(36px,5vw,64px)" px="gutter">
        <Grid
          templateColumns="repeat(auto-fit,minmax(320px,1fr))"
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

      <Box as="section" maxW="shell" mx="auto" pt="clamp(44px,6vw,80px)" px="gutter">
        <Flex wrap="wrap" gap="clamp(28px,4vw,56px)" align="stretch">
          <Box flex="1 1 420px" minW="0">
            <Heading
              as="h2"
              fontFamily="display"
              fontSize="clamp(28px,3.4vw,44px)"
              lineHeight="1.05"
              fontWeight="500"
              m="0"
              color="cream"
            >
              Booking enquiry
            </Heading>
            <Text
              mt="14px"
              fontSize="15px"
              lineHeight="1.7"
              color="rgba(247,239,221,0.6)"
              maxW="52ch"
              css={{ textWrap: "pretty" }}
            >
              Write directly with the date, the city and the room — include
              capacity, budget range and line-up if you know them. Answers within a
              few working days.
            </Text>

            <Flex mt="28px" wrap="wrap" gap="14px 18px">
              <Link
                href={`mailto:${CONTACT.booking}?subject=${encodeURIComponent("Booking enquiry — Ebo Krdum")}`}
                display="inline-flex"
                alignItems="center"
                fontSize="12px"
                letterSpacing="0.14em"
                textTransform="uppercase"
                fontWeight="600"
                color="ink"
                bg="amber"
                px="30px"
                py="17px"
                minH="52px"
                _hover={{ bg: "amberBright", color: "ink" }}
              >
                Email management →
              </Link>
              <Link
                href={CONTACT.phoneHref}
                display="inline-flex"
                alignItems="center"
                fontSize="12px"
                letterSpacing="0.14em"
                textTransform="uppercase"
                fontWeight="600"
                color="amber"
                border="1px solid"
                borderColor="rgba(232,169,58,0.6)"
                px="26px"
                py="17px"
                minH="52px"
                _hover={{ color: "ink", bg: "amber" }}
              >
                Call {CONTACT.phone}
              </Link>
            </Flex>

            <Box
              mt="clamp(28px,3.5vw,44px)"
              borderTop="1px solid"
              borderColor="rgba(139,90,43,0.45)"
              pt="22px"
              maxW="52ch"
            >
              <Box fontSize="11px" letterSpacing="0.24em" textTransform="uppercase" color="bronze">
                Useful to include
              </Box>
              <Text mt="12px" fontSize="15px" lineHeight="1.75" color="rgba(247,239,221,0.62)">
                Date and city · venue name and capacity · solo, trio or full band ·
                budget range · whether backline and sound are provided.
              </Text>
            </Box>
          </Box>

          <Box as="figure" flex="1 1 clamp(280px,30vw,440px)" maxW="520px" m="0">
            <PortraitFrame
              src={null}
              alt="Ebo Krdum performing with his band at a festival"
              ratio="4/3"
              minH="clamp(280px,42vw,520px)"
            />
            <Box
              as="figcaption"
              mt="14px"
              fontSize="13px"
              letterSpacing="0.14em"
              textTransform="uppercase"
              color="rgba(247,239,221,0.6)"
            >
              Live at Världsmusikfestivalen
            </Box>
          </Box>
        </Flex>
        <FilmStrip mt="clamp(48px,6vw,80px)" />
      </Box>
    </>
  );
}

Contact.getLayout = withSiteLayout({
  title: "Contact",
  description:
    "Booking, press and interview contacts for Ebo Krdum — solo, trio or full band.",
});
