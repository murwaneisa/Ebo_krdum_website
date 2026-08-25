import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Flex, Grid, Text } from "@chakra-ui/react";

/*
 * Album tracklist, optionally playable.
 *
 * With `interactive` false this renders exactly the static list the album page
 * has always shown. With it true, each row gains a play control backed by
 * Deezer's 30-second preview MP3s.
 *
 * Preview URLs are deliberately NOT part of the page props: Deezer signs them
 * with a 15-minute expiry and answers 403 afterwards, so a prerendered copy
 * would be stale for most of every hour. They are fetched from
 * /api/previews/[albumId] on the first press, and re-fetched if one has lapsed
 * while the tab sat open -- that is what the retry in `playTrack` is for.
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
  const previewsRef = useRef(null); // { [trackId]: signed mp3 url }
  const [currentId, setCurrentId] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);

  const current = tracks.find((t) => t.id === currentId) || null;

  /** Fetch the signed preview URLs. `force` discards a lapsed set. */
  const loadPreviews = useCallback(
    async (force = false) => {
      if (previewsRef.current && !force) return previewsRef.current;
      const res = await fetch(`/api/previews/${deezerAlbumId}`);
      if (!res.ok) throw new Error(`Previews are unavailable right now`);
      const json = await res.json();
      previewsRef.current = Object.fromEntries(
        (json.previews || []).map((p) => [p.id, p.preview])
      );
      return previewsRef.current;
    },
    [deezerAlbumId]
  );

  const playTrack = useCallback(
    async (track) => {
      const audio = audioRef.current;
      if (!audio) return;

      setError(null);
      setLoadingId(track.id);
      try {
        const start = async (src) => {
          audio.src = src;
          await audio.play();
        };

        let map = await loadPreviews();
        if (!map[track.id]) map = await loadPreviews(true);
        if (!map[track.id]) throw new Error("No preview for this track");

        try {
          await start(map[track.id]);
        } catch {
          // Most likely a lapsed signature (Deezer answers 403 after 15
          // minutes). Pull a fresh set and try once more before giving up.
          map = await loadPreviews(true);
          if (!map[track.id]) throw new Error("No preview for this track");
          await start(map[track.id]);
        }

        setCurrentId(track.id);
        setPlaying(true);
      } catch (err) {
        setError(err.message || "Could not play this track");
        setCurrentId(null);
        setPlaying(false);
      } finally {
        setLoadingId(null);
      }
    },
    [loadPreviews]
  );

  const toggle = useCallback(
    (track) => {
      const audio = audioRef.current;
      if (!audio) return;
      if (track.id !== currentId) {
        playTrack(track);
        return;
      }
      if (audio.paused) {
        audio
          .play()
          .then(() => setPlaying(true))
          .catch(() => setPlaying(false));
      } else {
        audio.pause();
        setPlaying(false);
      }
    },
    [currentId, playTrack]
  );

  // Advance to the next track, mirroring how an album is actually listened to.
  const onEnded = useCallback(() => {
    const i = tracks.findIndex((t) => t.id === currentId);
    const next = i >= 0 ? tracks[i + 1] : null;
    if (next) {
      playTrack(next);
    } else {
      setPlaying(false);
      setCurrentId(null);
    }
  }, [tracks, currentId, playTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;
    const onTime = () => setElapsed(audio.currentTime || 0);
    const onMeta = () => setTotal(audio.duration || 0);
    const onPause = () => setPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [onEnded]);

  const seek = (e) => {
    const audio = audioRef.current;
    if (audio && total) audio.currentTime = (Number(e.target.value) / 1000) * total;
  };

  if (tracks.length === 0) {
    return (
      <Text fontSize="16px" color="rgba(247,239,221,0.6)" maxW="42ch">
        The tracklist is temporarily unavailable. Play the record with the player
        alongside in the meantime.
      </Text>
    );
  }

  const pct = total ? (elapsed / total) * 100 : 0;

  return (
    <Box>
      <Box borderTop="1px solid" borderColor="rgba(139,90,43,0.45)">
        {tracks.map((t) => {
          const active = t.id === currentId;
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
                  onClick={() => toggle(t)}
                  aria-label={`${active && playing ? "Pause" : "Play"} ${t.title}`}
                  aria-pressed={active && playing}
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
                  <PlayIcon playing={active && playing} loading={loadingId === t.id} />
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

          {error && (
            <Text mt="16px" fontSize="14px" color="rgba(247,239,221,0.6)">
              {error}. The full record is on Spotify and Deezer above.
            </Text>
          )}

          {current && (
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
                    {current.title}
                  </Box>
                </Box>
                <Box fontFamily="mono" fontSize="13px" color="rgba(247,239,221,0.6)">
                  {fmt(elapsed)} / {fmt(total)}
                </Box>
              </Flex>

              <Box
                as="input"
                type="range"
                min="0"
                max="1000"
                value={total ? Math.round((elapsed / total) * 1000) : 0}
                onChange={seek}
                aria-label={`Seek within ${current.title}`}
                w="100%"
                mt="14px"
                display="block"
                cursor="pointer"
                css={{
                  appearance: "none",
                  height: "4px",
                  borderRadius: "2px",
                  background: `linear-gradient(90deg, ${AMBER} ${pct}%, rgba(139,90,43,0.45) ${pct}%)`,
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

function fmt(seconds) {
  if (!seconds || Number.isNaN(seconds)) return "0:00";
  const s = Math.floor(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
