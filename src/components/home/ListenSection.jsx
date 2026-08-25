import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import Eyebrow from "../common/Eyebrow";
import SectionHeading from "../common/SectionHeading";
import { SocialIconLink } from "../common/SocialIcons";
import SpotifyEmbed from "./SpotifyEmbed";
import { SPOTIFY_ARTIST_ID, STREAMING } from "@/data/site";

export default function ListenSection() {
  return (
    <Box
      as="section"
      id="listen"
      maxW="shell"
      mx="auto"
      pt="clamp(52px,7vw,88px)"
      px="gutter"
    >
      <Grid
        templateColumns="repeat(auto-fit,minmax(320px,1fr))"
        gap="clamp(32px,4vw,56px)"
        alignItems="start"
      >
        <Box>
          <Eyebrow>03 — Listen</Eyebrow>
          <SectionHeading>
            Top tracks,
            <br />
            live from Spotify
          </SectionHeading>
          {/*
            The artboard copy claimed this was read from the Spotify Web API.
            GET /artists/{id}/top-tracks was removed in Feb 2026, and the artboard
            markup was always the embed — so the wording is corrected here.
          */}
          <Text
            mt="22px"
            fontSize="16px"
            lineHeight="1.7"
            color="rgba(247,239,221,0.66)"
            maxW="38ch"
          >
            Straight from his Spotify artist profile, so the running order
            follows what people are actually playing this week.
          </Text>

          <Box
            mt="clamp(28px,3.4vw,40px)"
            borderTop="1px solid"
            borderColor="rgba(139,90,43,0.45)"
            pt="22px"
          >
            <Box
              fontSize="11px"
              letterSpacing="0.24em"
              textTransform="uppercase"
              color="bronze"
            >
              Also on
            </Box>
            <Flex wrap="wrap" gap="12px" mt="16px">
              {STREAMING.map((s) => (
                <SocialIconLink key={s.label} {...s} box={52} />
              ))}
            </Flex>
          </Box>
        </Box>

        <SpotifyEmbed
          type="artist"
          id={SPOTIFY_ARTIST_ID}
          title="Ebo Krdum on Spotify"
          height={420}
          bg="surface"
        />
      </Grid>
    </Box>
  );
}
