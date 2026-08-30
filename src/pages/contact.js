import Image from "next/image";
import { Box, Flex, Grid, Heading, Link, Text } from "@chakra-ui/react";
import { withSiteLayout } from "@/components/layout/SiteLayout";
import FilmStrip from "@/components/common/FilmStrip";
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
  {
    label: "Based in",
    value: CONTACT.base,
    note: "Touring across Sweden and Europe and the whole world.",
  },
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
    <Box
      bg="surface"
      p="clamp(1.375rem,2.6vw,2.125rem)"
      boxShadow="0 0 0 1px rgba(139,90,43,0.45)"
    >
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
      <Text
        mt="3.5"
        textStyle="meta"
        lineHeight="1.65"
        color="rgba(247,239,221,0.55)"
      >
        {note}
      </Text>
    </Box>
  );
}

export default function Contact() {
  return (
    <>
      <Box
        as="section"
        maxW="shell"
        mx="auto"
        pt="clamp(2.5rem,6vw,4rem)"
        px="gutter"
      >
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
            Booking for festivals, clubs and cultural houses — solo, trio or
            full band. Press requests, interviews and stage plots handled by the
            same team.
          </Text>
        </Flex>
        <FilmStrip mt="clamp(2rem,4.5vw,3.25rem)" />
      </Box>

      <Box
        as="section"
        maxW="shell"
        mx="auto"
        pt="clamp(2.25rem,5vw,4rem)"
        px="gutter"
      >
        <Box
          position="relative"
          overflow="hidden"
          bg="ink"
          border="1px solid"
          borderColor="rgba(139,90,43,0.45)"
          minH={{ base: "auto", md: "32rem" }}
          display="flex"
          alignItems={{ base: "stretch", md: "flex-end" }}
        >
          <Image
            src="/images/wax1.jpg"
            alt=""
            aria-hidden="true"
            fill
            sizes="(max-width: 48em) 100vw, 75rem"
            style={{ objectFit: "cover", objectPosition: "40% 55%" }}
          />
          {/*
           * Scrims, same idea as the home hero. Wide screens stack two so the
           * darkening concentrates in the bottom-left corner the copy sits in
           * and the rest of the frame stays open; narrow screens get a single
           * vertical one, where the text runs full width instead of hugging
           * the left.
           */}
          <Box
            position="absolute"
            inset="0"
            background={{
              base: "linear-gradient(180deg,rgba(36,26,16,0.72) 0%,rgba(36,26,16,0.62) 45%,rgba(36,26,16,0.8) 100%)",
              md: "linear-gradient(90deg,rgba(36,26,16,0.62) 0%,rgba(36,26,16,0.4) 45%,rgba(36,26,16,0.08) 80%,rgba(36,26,16,0) 100%),linear-gradient(0deg,rgba(36,26,16,0.55) 0%,rgba(36,26,16,0.18) 45%,rgba(36,26,16,0) 75%)",
            }}
          />

          <Box
            position="relative"
            maxW={{ base: "100%", md: "34rem" }}
            px="clamp(1.5rem,4vw,3.5rem)"
            py="clamp(2.5rem,6vw,4.5rem)"
          >
            <Heading as="h2" textStyle="sectionSm" m="0" color="cream">
              Booking enquiry
            </Heading>
            <Text
              mt="3.5"
              textStyle="body"
              lineHeight="1.7"
              color="rgba(247,239,221,0.85)"
              maxW="52ch"
              css={{ textWrap: "pretty" }}
            >
              Write directly with the date, the city and the room — include
              capacity, budget range and line-up if you know them. Answers
              within a few working days.
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
                px={{ base: "5", md: "8" }}
                py={{ base: "3", md: "4.5" }}
                minH={{ base: "11", md: "14" }}
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
                px={{ base: "4.5", md: "7" }}
                py={{ base: "3", md: "4.5" }}
                minH={{ base: "11", md: "14" }}
                _hover={{ color: "ink", bg: "amber" }}
              >
                Call {CONTACT.phone}
              </Link>
            </Flex>
          </Box>
        </Box>
        <Grid
          mt="clamp(2.5rem,5vw,4rem)"
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

      <Box
        as="section"
        maxW="shell"
        mx="auto"
        pt="clamp(2.75rem,6vw,5rem)"
        px="gutter"
      >
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
