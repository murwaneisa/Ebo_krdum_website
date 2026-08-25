import { useRef } from "react";
import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import usePreviewPlayer, { fmt } from "./usePreviewPlayer";

/*
 * Album tracklist.
 *
 * With `interactive` false this renders the plain static list. With it true,
 * each row gains an inline play control driven by usePreviewPlayer, which is
 * the same state machine the AlbumPreviewPlayer card uses.
 */

const ROW_BORDER = "rgba(139,90,43,0.3)";
const AMBER = "#E8A93A";
const AMBER_BRIGHT = "#F5C242";

function PlayIcon({ playing, loading }) {
  if (loading) {
    return (
      <Box
        as="span"
        w="12px"
        h="12px"
        borderRadius="50%"
        border="2px solid"
        borderColor="currentColor"
        borderTopColor="transparent"
        css={{
          animation: "trackspin 0.7s linear infinite",
          "@keyframes trackspin": { to: { transform: "rotate(360deg)" } },
        }}
      />
    );
  }
  return (
    <Box as="span" aria-hidden="true" fontSize="11px" lineHeight="1">
      {playing ? "❚❚" : "▶"}
    </Box>
  );
}

export default function Tracklist({ tracks = [], deezerAlbumId, interactive = false }) {
  const audioRef = useRef(null);
  const p = usePreviewPlayer(deezerAlbumId, tracks, audioRef);

  if (tracks.length === 0) {
    return (
      <Text fontSize="16px" color="rgba(247,239,221,0.6)" maxW="42ch">
        The tracklist is temporarily unavailable. Play the record with the player
        alongside in the meantime.
      </Text>
    );
  }

  return (
    <Box>
      <Box borderTop="1px solid" borderColor="rgba(139,90,43,0.45)">
        {tracks.map((t) => {
          const active = t.id === p.currentId;
          return (
            <Grid
              key={`${t.num}-${t.title}`}
              templateColumns={
                interactive ? "34px 34px minmax(0,1fr) auto" : "36px minmax(0,1fr) auto"
              }
              gap="14px"
              alignItems="center"
              py="16px"
              px="4px"
              borderBottom="1px solid"
              borderColor={ROW_BORDER}
              bg={active ? "rgba(232,169,58,0.07)" : "transparent"}
            >
              <Box fontFamily="display" fontSize="15px" color={active ? "amber" : "bronze"}>
                {t.num}
              </Box>

              {interactive && (
                <Box
                  as="button"
                  type="button"
                  onClick={() => p.toggle(t)}
                  aria-label={`${active && p.playing ? "Pause" : "Play"} ${t.title}`}
                  aria-pressed={active && p.playing}
                  w="30px"
                  h="30px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="50%"
                  cursor="pointer"
                  border="1px solid"
                  borderColor={active ? "amber" : "rgba(139,90,43,0.7)"}
                  bg={active ? "amber" : "transparent"}
                  color={active ? "ink" : "cream"}
                  _hover={{ borderColor: "amber", color: active ? "ink" : "amberBright" }}
                >
                  <PlayIcon playing={active && p.playing} loading={p.loadingId === t.id} />
                </Box>
              )}

              <Box
                fontFamily="display"
                fontSize="21px"
                fontWeight="500"
                color={active ? "amberBright" : "cream"}
                css={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {t.title}
              </Box>

              <Box fontFamily="mono" fontSize="13px" color="rgba(247,239,221,0.5)">
                {t.time}
              </Box>
            </Grid>
          );
        })}
      </Box>

      {interactive && (
        <>
          <audio ref={audioRef} preload="none" />

          {p.error && (
            <Text mt="16px" fontSize="14px" color="rgba(247,239,221,0.6)">
              {p.error}. The full record is on Spotify and Deezer above.
            </Text>
          )}

          {p.currentTrack && (
            <Box
              mt="22px"
              border="1px solid"
              borderColor="rgba(232,169,58,0.45)"
              bg="surface"
              px="20px"
              py="16px"
            >
              <Flex align="baseline" justify="space-between" gap="16px" wrap="wrap">
                <Box minW="0">
                  <Box
                    fontSize="11px"
                    letterSpacing="0.22em"
                    textTransform="uppercase"
                    color="bronze"
                  >
                    Preview &mdash; 30 seconds
                  </Box>
                  <Box fontFamily="display" fontSize="20px" color="cream" mt="4px">
                    {p.currentTrack.title}
                  </Box>
                </Box>
                <Box fontFamily="mono" fontSize="13px" color="rgba(247,239,221,0.6)">
                  {fmt(p.elapsed)} / {fmt(p.total)}
                </Box>
              </Flex>

              <Box
                as="input"
                type="range"
                min="0"
                max="1000"
                value={Math.round(p.progress * 10)}
                onChange={(e) => p.seek(e.target.value)}
                aria-label={`Seek within ${p.currentTrack.title}`}
                w="100%"
                mt="14px"
                display="block"
                cursor="pointer"
                css={{
                  appearance: "none",
                  height: "4px",
                  borderRadius: "2px",
                  background: `linear-gradient(90deg, ${AMBER} ${p.progress}%, rgba(139,90,43,0.45) ${p.progress}%)`,
                  "&::-webkit-slider-thumb": {
                    appearance: "none",
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    background: AMBER_BRIGHT,
                    cursor: "pointer",
                  },
                  "&::-moz-range-thumb": {
                    width: "14px",
                    height: "14px",
                    border: "none",
                    borderRadius: "50%",
                    background: AMBER_BRIGHT,
                    cursor: "pointer",
                  },
                }}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

