import { Box, Link, Text } from "@chakra-ui/react";
import { SPOTIFY_ARTIST_ID } from "@/data/site";

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
        p="6"
        bg={bg}
      >
        <Text textStyle="body" lineHeight="1.7" color="rgba(247,239,221,0.6)">
          This release is not streaming here yet.
        </Text>
        <Link
          // The artist profile rather than a search for the title: a release
          // with no Deezer id is usually too new to be found by search anyway.
          href={`https://open.spotify.com/artist/${SPOTIFY_ARTIST_ID}`}
          target="_blank"
          rel="noopener noreferrer"
          display="inline-block"
          mt="3.5"
          textStyle="eyebrow"
          letterSpacing="0.12em"
          fontWeight="600"
        >
          Find it on Spotify →
        </Link>
      </Box>
    );
  }

  return (
    <Box border="1px solid" borderColor="rgba(139,90,43,0.5)" p="3" bg={bg}>
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
