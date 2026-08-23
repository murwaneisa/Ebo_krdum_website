/*
 * Discography — assembled from Deezer, with Sanity as an optional overlay.
 *
 * Deezer owns the facts (title, cover, release date, tracklist). Nothing here
 * needs a CMS entry, so a new release appears on the site by itself. The two
 * maps below are the only hand-maintained values, and both are optional:
 *
 *   SLUG_OVERRIDES     keeps pre-existing URLs alive where Deezer's title
 *                      differs from the slug the site already published.
 *   SPOTIFY_ALBUM_IDS  lets a release use the Spotify player instead of the
 *                      Deezer one. Absent means the Deezer widget is used.
 *
 * FALLBACK_ALBUMS is the last resort if Deezer is unreachable at build time.
 */

const SANITY_PROJECT = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "6y0e37tr";
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const SANITY_CDN = `https://cdn.sanity.io/images/${SANITY_PROJECT}/${SANITY_DATASET}/`;

export const DEEZER_IMAGE_HOST = "cdn-images.dzcdn.net";

/*
 * Deezer album id → corrections for that release.
 *
 * `slug` keeps a URL the site already published. `title` fixes a Deezer title
 * that reads badly on the page — both of these arrive as "… (Genuine Mezziga
 * with)", an unfinished collaborator credit.
 */
const RELEASE_OVERRIDES = {
  116699982: { slug: "salam", title: "Salam" },
  127107212: { slug: "anasna", title: "Anasna" },
};

/**
 * slug → Spotify album id, for releases that should use the Spotify player.
 * Anything missing here falls back to the Deezer widget, so this map is purely
 * an upgrade path and never a requirement. Sanity can supply ids too.
 */
const SPOTIFY_ALBUM_IDS = {
  "soga-jamaile": "0cuTRYEfi51fk7FjrcW6uY",
};

/** The release shown in the "Featured album" block, by slug. */
export const FEATURED_SLUG = "soga-jamaile";

/**
 * URL-safe slug from a release title.
 * "Love & Struggle" -> "love-and-struggle", "Soga Jamailé" -> "soga-jamaile".
 */
export function slugify(title) {
  return String(title || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/**
 * Cover art URL at an arbitrary square size.
 *
 * Deezer serves any dimension from the release's `md5_image`, so covers scale
 * with the layout rather than being pinned to the API's four preset sizes.
 * Falls back to the Sanity CDN for entries that only exist in FALLBACK_ALBUMS.
 */
export function coverUrl(album, width = 700, quality = 80) {
  if (album?.coverMd5) {
    return `https://${DEEZER_IMAGE_HOST}/images/cover/${album.coverMd5}/${width}x${width}-000000-80-0-0.jpg`;
  }
  if (album?.sanityCover) {
    return `${SANITY_CDN}${album.sanityCover}?w=${width}&q=${quality}`;
  }
  return null;
}

/** Normalise one raw Deezer release into the shape the pages render. */
export function toAlbum(release) {
  const override = RELEASE_OVERRIDES[release.id] || {};
  const slug = override.slug || slugify(release.title) || String(release.id);
  return {
    slug,
    deezerAlbumId: release.id,
    spotifyAlbumId: SPOTIFY_ALBUM_IDS[slug] || null,
    title: override.title || release.title,
    year: String(release.release_date || "").slice(0, 4) || "",
    releaseDate: release.release_date || null,
    recordType: release.record_type || "album", // album | ep | single
    trackCount: release.nb_tracks ?? null,
    coverMd5: release.md5_image || null,
    sanityCover: null,
  };
}

/**
 * The full discography, newest first and numbered for display.
 *
 * `releases` is the raw array from lib/deezer.js `getArtistAlbums`. An empty
 * array means Deezer was unreachable, so the local fallback is returned and the
 * site still renders.
 */
export function buildDiscography(releases) {
  if (!Array.isArray(releases) || releases.length === 0) {
    return numbered(FALLBACK_ALBUMS);
  }

  const seen = new Set();
  const albums = releases.map(toAlbum).map((album) => {
    // Two releases can slugify identically (a title reused across formats).
    // Suffix the Deezer id so every route stays unique and stable.
    let slug = album.slug;
    if (seen.has(slug)) slug = `${slug}-${album.deezerAlbumId}`;
    seen.add(slug);
    return slug === album.slug ? album : { ...album, slug };
  });

  return numbered(
    albums.sort((a, b) =>
      String(b.releaseDate || "").localeCompare(String(a.releaseDate || ""))
    )
  );
}

function numbered(albums) {
  return albums.map((a, i) => ({ ...a, num: String(i + 1).padStart(2, "0") }));
}

/**
 * Used only when Deezer cannot be reached during the build. Covers come from
 * Sanity here because these entries predate the Deezer integration.
 */
export const FALLBACK_ALBUMS = [
  {
    slug: "soga-jamaile",
    title: "Soga Jamailé",
    year: "2023",
    releaseDate: "2023-09-22",
    recordType: "album",
    deezerAlbumId: 480399835,
    spotifyAlbumId: SPOTIFY_ALBUM_IDS["soga-jamaile"],
    trackCount: 8,
    coverMd5: null,
    sanityCover: "8972cbd4e4cbdac4c1c3892a25f14556e16a336c-3000x3000.jpg",
  },
  {
    slug: "revolt-for-change",
    title: "Revolt for Change",
    year: "2022",
    releaseDate: "2022-12-16",
    recordType: "album",
    deezerAlbumId: 376116257,
    spotifyAlbumId: null,
    trackCount: null,
    coverMd5: null,
    sanityCover: "dbdc8fdfcb93fd4c4e0301380176093c1295ec03-3000x3000.png",
  },
  {
    slug: "love-and-struggle",
    title: "Love & Struggle",
    year: "2022",
    releaseDate: "2022-05-27",
    recordType: "album",
    deezerAlbumId: 305235457,
    spotifyAlbumId: null,
    trackCount: null,
    coverMd5: null,
    sanityCover: "8f0d7e8b8c8eed8276b2e1b0e0b706d80dbbd2d8-1080x1080.jpg",
  },
  {
    slug: "diversity",
    title: "Diversity",
    year: "2021",
    releaseDate: "2021-09-30",
    recordType: "album",
    deezerAlbumId: 328368067,
    spotifyAlbumId: null,
    trackCount: null,
    coverMd5: null,
    sanityCover: "bf55c2004612bc959b6621207806d36caf6e4392-1400x1400.jpg",
  },
  {
    slug: "salam",
    title: "Salam",
    year: "2019",
    releaseDate: "2019-10-29",
    recordType: "ep",
    deezerAlbumId: 116699982,
    spotifyAlbumId: null,
    trackCount: null,
    coverMd5: null,
    sanityCover: "574e30717e3d18b342c3d6037207eeb1f86cc641-1400x1400.jpg",
  },
  {
    slug: "anasna",
    title: "Anasna",
    year: "2020",
    releaseDate: "2020-01-17",
    recordType: "single",
    deezerAlbumId: 127107212,
    spotifyAlbumId: null,
    trackCount: null,
    coverMd5: null,
    sanityCover: "cde6b1a8623a6a55e0d362e9956836a2ca4dd250-1400x1400.jpg",
  },
];
