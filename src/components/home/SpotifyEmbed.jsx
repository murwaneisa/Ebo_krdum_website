import { Box } from "@chakra-ui/react";

/*
 * Spotify's iframe embed. Deliberately used instead of the Web API for playback:
 * `preview_url` is null under Client Credentials and GET /artists/{id}/top-tracks
 * was removed in Feb 2026, so the embed is the only way to actually play audio.
 */
export default function SpotifyEmbed({ type = "album", id, title, height = 440, bg = "ink" }) {
  if (!id) return null;
  return (
    <Box border="1px solid" borderColor="rgba(139,90,43,0.5)" p="3" bg={bg}>
      <Box
        as="iframe"
        title={title}
        src={`https://open.spotify.com/embed/${type}/${id}?utm_source=generator`}
        width="100%"
        height={`${height}px`}
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        border="0"
        display="block"
      />
    </Box>
  );
}
