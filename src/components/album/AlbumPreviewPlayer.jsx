import { useRef } from "react";
import { Box, Flex } from "@chakra-ui/react";
import usePreviewPlayer, { fmt } from "./usePreviewPlayer";

/*
 * Self-contained album player, laid out like Spotify's embed widget but in the
 * site's own palette: cover and title on top, a scrolling tracklist, and a
 * transport bar pinned underneath.
 *
 * The point of building it rather than embedding is that an iframe is
 * cross-origin, so no amount of CSS can reach inside it — an embed is always a
 * foreign-looking box. It also carries no third-party branding, so it does not
 * suggest the music lives on any one service.
 *
 * Audio is Deezer's 30-second previews. See usePreviewPlayer for why the URLs
 * are fetched on demand rather than prerendered.
 */

const SCROLLBAR = {
  "&::-webkit-scrollbar": { width: "6px" },
  "&::-webkit-scrollbar-track": { background: "rgba(46,33,21,0.6)" },
  "&::-webkit-scrollbar-thumb": { background: "#8B5A2B", borderRadius: "3px" },
  scrollbarWidth: "thin",
  scrollbarColor: "#8B5A2B rgba(46,33,21,0.6)",
};

function Glyph({ playing, loading, size = "13px" }) {
  if (loading) {
    return (
      <Box
        as="span"
        w="13px"
        h="13px"
        borderRadius="50%"
        border="2px solid"
        borderColor="currentColor"
        borderTopColor="transparent"
        css={{
          animation: "pvspin 0.7s linear infinite",
          "@keyframes pvspin": { to: { transform: "rotate(360deg)" } },
        }}
      />
    );
  }
  return (
    <Box as="span" aria-hidden="true" fontSize={size} lineHeight="1">
      {playing ? "❚❚" : "▶"}
    </Box>
  );
}

export default function AlbumPreviewPlayer({
  album,
  tracks = [],
  coverSrc,
  artist = "Ebo Krdum",
}) {
  const audioRef = useRef(null);
  const p = usePreviewPlayer(album?.deezerAlbumId, tracks, audioRef);

  if (!tracks.length) return null;

  return (
    <Box
      border="1px solid"
      borderColor="rgba(139,90,43,0.55)"
      bg="surface"
      display="flex"
      flexDirection="column"
      overflow="hidden"
    >
      {/* Header — cover, title, primary transport */}
      <Flex gap="16px" p="16px" align="center">
        <Box
          flex="0 0 auto"
          w="76px"
          h="76px"
          bg="ink"
          border="1px solid"
          borderColor="rgba(139,90,43,0.45)"
          css={{
            backgroundImage: coverSrc ? `url(${coverSrc})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          role="img"
          aria-label={`${album?.title} album cover`}
        />

        <Box minW="0" flex="1 1 auto">
          <Box
            fontFamily="display"
            fontSize="21px"
            fontWeight="600"
            color="cream"
            lineHeight="1.15"
            css={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
          >
            {album?.title}
          </Box>
          <Box fontSize="13px" color="rgba(247,239,221,0.6)" mt="3px">
            {artist}
          </Box>
          <Box
            fontFamily="mono"
            fontSize="10px"
            letterSpacing="0.16em"
            textTransform="uppercase"
            color="bronze"
            mt="7px"
          >
            {album?.year} · {tracks.length} tracks · previews
          </Box>
        </Box>

        <Box
          as="button"
          type="button"
          onClick={p.toggleCurrent}
          aria-label={p.playing ? "Pause" : "Play album"}
          flex="0 0 auto"
          w="46px"
          h="46px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="50%"
          border="none"
          cursor="pointer"
          bg="amber"
          color="ink"
          _hover={{ bg: "amberBright" }}
        >
          <Glyph
            playing={p.playing}
            loading={p.loadingId !== null && p.currentId === null}
            size="15px"
          />
        </Box>
      </Flex>

      {/* Tracklist */}
      <Box
        maxH="248px"
        overflowY="auto"
        borderTop="1px solid"
        borderColor="rgba(139,90,43,0.35)"
        css={SCROLLBAR}
      >
        {tracks.map((t, i) => {
          const active = t.id === p.currentId;
          return (
            <Box
              key={`${t.num}-${t.title}`}
              as="button"
              type="button"
              onClick={() => p.toggle(t)}
              aria-label={`${active && p.playing ? "Pause" : "Play"} ${t.title}`}
              aria-current={active ? "true" : undefined}
              display="grid"
              w="100%"
              textAlign="left"
              cursor="pointer"
              border="none"
              borderBottom="1px solid"
              borderColor="rgba(139,90,43,0.18)"
              gridTemplateColumns="26px minmax(0,1fr) auto"
              gap="12px"
              alignItems="center"
              px="16px"
              py="11px"
              bg={active ? "rgba(232,169,58,0.1)" : "transparent"}
              color={active ? "amberBright" : "cream"}
              _hover={{ bg: active ? "rgba(232,169,58,0.14)" : "rgba(247,239,221,0.05)" }}
            >
              <Box
                fontFamily="mono"
                fontSize="12px"
                color={active ? "amber" : "rgba(247,239,221,0.4)"}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {active || p.loadingId === t.id ? (
                  <Glyph playing={active && p.playing} loading={p.loadingId === t.id} size="10px" />
                ) : (
                  String(i + 1).padStart(2, "0")
                )}
              </Box>

              <Box
                fontFamily="display"
                fontSize="16px"
                fontWeight="500"
                css={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
              >
                {t.title}
              </Box>

              <Box fontFamily="mono" fontSize="12px" color="rgba(247,239,221,0.45)">
                {t.time}
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Transport */}
      <Box
        borderTop="1px solid"
        borderColor="rgba(139,90,43,0.45)"
        bg="ink"
        px="16px"
        py="13px"
      >
        <Flex align="center" gap="12px">
          <Box
            as="button"
            type="button"
            onClick={() => p.step(-1)}
            aria-label="Previous track"
            fontSize="12px"
            color="rgba(247,239,221,0.65)"
            bg="transparent"
            border="none"
            cursor="pointer"
            _hover={{ color: "amberBright" }}
          >
            ◀◀
          </Box>
          <Box
            as="button"
            type="button"
            onClick={() => p.step(1)}
            aria-label="Next track"
            fontSize="12px"
            color="rgba(247,239,221,0.65)"
            bg="transparent"
            border="none"
            cursor="pointer"
            _hover={{ color: "amberBright" }}
          >
            ▶▶
          </Box>

          <Box
            as="input"
            type="range"
            min="0"
            max="1000"
            value={Math.round(p.progress * 10)}
            onChange={(e) => p.seek(e.target.value)}
            aria-label={p.currentTrack ? `Seek within ${p.currentTrack.title}` : "Seek"}
            flex="1 1 auto"
            cursor="pointer"
            css={{
              appearance: "none",
              height: "4px",
              borderRadius: "2px",
              background: `linear-gradient(90deg, #E8A93A ${p.progress}%, rgba(139,90,43,0.45) ${p.progress}%)`,
              "&::-webkit-slider-thumb": {
                appearance: "none",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#F5C242",
                cursor: "pointer",
              },
              "&::-moz-range-thumb": {
                width: "12px",
                height: "12px",
                border: "none",
                borderRadius: "50%",
                background: "#F5C242",
                cursor: "pointer",
              },
            }}
          />

          <Box
            flex="0 0 auto"
            fontFamily="mono"
            fontSize="11px"
            color="rgba(247,239,221,0.55)"
          >
            {fmt(p.elapsed)} / {fmt(p.total)}
          </Box>
        </Flex>

        <Box
          mt="9px"
          fontSize="11px"
          lineHeight="1.5"
          color={p.error ? "rgba(247,239,221,0.75)" : "rgba(247,239,221,0.42)"}
        >
          {p.error
            ? `${p.error}. The full record is on Spotify and Deezer above.`
            : "30-second previews. Play the full album on Spotify or Deezer above."}
        </Box>
      </Box>

      <audio ref={audioRef} preload="none" />
    </Box>
  );
}
