import { Box, Link, Text } from "@chakra-ui/react";

/*
 * Playback for one release.
 *
 * Spotify is preferred when a Spotify album id is known — from Sanity, or from
 * the small map in lib/albums.js. Spotify ids have no automatic source (their
 * Web API needs a Premium developer account), so relying on them alone would
 * leave every new release without a player until someone filled in a field.
 *
 * The Deezer widget is the fallback: its id already arrives with the metadata,
 * so a release published today gets a working player with no admin at all.
 * Both are plain iframes and neither needs a key.
 */
export default function AlbumPlayer({
  spotifyAlbumId,
  deezerAlbumId,
  title,
  height = 440,
  bg = "ink",
}) {
  const source = spotifyAlbumId
    ? {
        src: `https://open.spotify.com/embed/album/${spotifyAlbumId}?utm_source=generator&theme=0`,
        label: `${title} on Spotify`,
      }
    : deezerAlbumId
      ? {
          src: `https://widget.deezer.com/widget/dark/album/${deezerAlbumId}?tracklist=true`,
          label: `${title} on Deezer`,
        }
      : null;

  // No id from either service — offer a search rather than an empty panel.
  if (!source) {
    return (
      <Box border="1px solid" borderColor="rgba(139,90,43,0.5)" p="24px" bg={bg}>
        <Text fontSize="15px" lineHeight="1.7" color="rgba(247,239,221,0.6)">
          This release is not streaming here yet.
        </Text>
        <Link
          href={`https://open.spotify.com/search/${encodeURIComponent(title || "Ebo Krdum")}`}
          target="_blank"
          rel="noopener noreferrer"
          display="inline-block"
          mt="14px"
          fontSize="13px"
          letterSpacing="0.12em"
          textTransform="uppercase"
          fontWeight="600"
        >
          Find it on Spotify →
        </Link>
      </Box>
    );
  }

  return (
    <Box border="1px solid" borderColor="rgba(139,90,43,0.5)" p="12px" bg={bg}>
      <Box
        as="iframe"
        title={source.label}
        src={source.src}
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
