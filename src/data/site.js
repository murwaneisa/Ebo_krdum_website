/* Static site-wide content taken from the Claude Design artboards. */

/*
 * Deezer is the source of truth for album and track metadata — its public API
 * needs no key, so the discography syncs itself. Confirmed via
 * https://api.deezer.com/search/artist?q=Ebo%20Krdum
 */
export const DEEZER_ARTIST_ID = "77304962";

/* Used for the artist embed and the profile links below — not for the Web API. */
export const SPOTIFY_ARTIST_ID = "5tp0MlkqeohanVULV0V08d";

const DEEZER_ARTIST_URL = `https://www.deezer.com/artist/${DEEZER_ARTIST_ID}`;

export const CONTACT = {
  booking: "management@ebokrdum.com",
  press: "info@ebokrdum.com",
  phone: "+46 737 40 17 11",
  phoneHref: "tel:+46737401711",
  base: "Stockholm, Sweden",
  tagline: "Newcomer of the Year, Folk & World Music Gala 2020",
};

export const NAV = [
  { label: "Home", href: "/" },
  { label: "Shows", href: "/shows" },
  { label: "Press", href: "/press" },
  { label: "Biography", href: "/biography" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

/* `icon` keys map to the SVG paths in components/common/SocialIcons.jsx */
export const SOCIALS = [
  {
    icon: "spotify",
    label: "Spotify",
    href: `https://open.spotify.com/artist/${SPOTIFY_ARTIST_ID}`,
  },
  {
    icon: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCtQCeThNAGW_5MSRdFYX2bQ",
  },
  {
    icon: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/ebokrdum/",
  },
  {
    icon: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/EboKrdumofficial",
  },
  { icon: "x", label: "X", href: "https://twitter.com/EKrdum" },
  { icon: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@ebokrdum" },
  {
    icon: "soundcloud",
    label: "SoundCloud",
    href: "https://soundcloud.com/ebokrdum",
  },
];

/* "Also on" row in the Listen section */
export const STREAMING = [
  {
    icon: "spotify",
    label: "Spotify",
    href: `https://open.spotify.com/artist/${SPOTIFY_ARTIST_ID}`,
  },
  {
    icon: "apple",
    label: "Apple Music",
    href: "https://music.apple.com/artist/ebo-krdum/1441657394",
  },
  {
    icon: "amazon",
    label: "Amazon Music",
    href: "https://music.amazon.com/search/ebo+krdum",
  },
  {
    icon: "youtube",
    label: "YouTube Music",
    href: "https://music.youtube.com/channel/UCtQCeThNAGW_5MSRdFYX2bQ",
  },
  {
    icon: "soundcloud",
    label: "SoundCloud",
    href: "https://soundcloud.com/ebokrdum",
  },
  { icon: "deezer", label: "Deezer", href: DEEZER_ARTIST_URL },
];
