import { Box, Link, Text } from "@chakra-ui/react";

/*
 * Playback for one release — the Deezer widget, everywhere.
 *
 * Deezer plays every specific album because its album id arrives automatically
 * with the metadata, so a release published today gets a working player with no
 * admin at all. Spotify album ids have no automatic source (their Web API needs
 * a Premium developer account), so preferring Spotify here would leave every
 * new release player-less until someone filled in a field, and would mix two
 * different-looking players across the site.
 *
 * The homepage Listen section is the deliberate exception: it embeds the
 * Spotify *artist* player, whose id is one stable value in data/site.js.
 *
 * Spotify is still linked from every album page, so nothing here implies the
 * music is Deezer-only.
 */
export default function AlbumPlayer({
  deezerAlbumId,
  title,
  height = 440,
  bg = "ink",
}) {
  // No Deezer id — offer a search rather than an empty panel.
  if (!deezerAlbumId) {
    return (
      <Box
        border="1px solid"
        borderColor="rgba(139,90,43,0.5)"
        p="24px"
        bg={bg}
      >
        <Text fontSize="15px" lineHeight="1.7" color="rgba(247,239,221,0.6)">
          This release is not streaming here yet.
        </Text>
        <Link
          href={`https://open.spotify.com/search/${encodeURIComponent(
            `Ebo Krdum ${title || ""}`.trim(),
          )}`}
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
        title={`${title} on Deezer`}
        src={`https://widget.deezer.com/widget/dark/album/${deezerAlbumId}?tracklist=true`}
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
