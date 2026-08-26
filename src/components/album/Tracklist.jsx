import { Box, Grid, Text } from "@chakra-ui/react";

/*
 * Album tracklist — titles, positions and durations, all from Deezer.
 *
 * Playback lives in the Deezer widget alongside rather than in these rows, so
 * there is one player per page instead of two sets of controls.
 */

const ROW_BORDER = "rgba(139,90,43,0.3)";

export default function Tracklist({ tracks = [] }) {
  if (tracks.length === 0) {
    return (
      <Text textStyle="body" color="rgba(247,239,221,0.6)" maxW="42ch">
        The tracklist is temporarily unavailable. Play the record with the
        player alongside in the meantime.
      </Text>
    );
  }

  return (
    <Box borderTop="1px solid" borderColor="rgba(139,90,43,0.45)">
      {tracks.map((t) => (
        <Grid
          key={`${t.num}-${t.title}`}
          templateColumns="2.25rem minmax(0,1fr) auto"
          gap="3.5"
          alignItems="baseline"
          py="4.5"
          px="1"
          borderBottom="1px solid"
          borderColor={ROW_BORDER}
        >
          <Box fontFamily="display" textStyle="body" color="bronze">
            {t.num}
          </Box>

          <Box fontFamily="display" fontSize="xl" fontWeight="500" color="cream">
            {t.title}
          </Box>

          <Box fontFamily="mono" textStyle="meta" color="rgba(247,239,221,0.5)">
            {t.time}
          </Box>
        </Grid>
      ))}
    </Box>
  );
}
