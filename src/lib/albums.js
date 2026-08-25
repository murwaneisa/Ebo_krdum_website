/*
 * Discography — assembled entirely from Deezer.
 *
 * Deezer owns every fact: title, cover, release date, tracklist. No CMS entry
 * is involved, so a new release appears on the site by itself. The three maps
 * below are the only hand-maintained values, and all are optional:
 *
 *   RELEASE_OVERRIDES  fixes a bad Deezer title, or pins a slug so a URL the
 *                      site already published keeps working.
 *   SPOTIFY_ALBUM_IDS  lets a release use the Spotify player instead of the
 *                      Deezer one. Absent means the Deezer widget is used.
 *   LOCAL_COVERS       cover art served from public/images/albums, used when
 *                      Deezer has no cover for a release.
 *
 * FALLBACK_ALBUMS is the last resort if Deezer is unreachable at build time.
 */

export const DEEZER_IMAGE_HOST = "cdn-images.dzcdn.net";

/**
 * Locally hosted cover art, used whenever Deezer has no cover for a release —
 * either the API was unreachable and the fallback discography is being served,
 * or a release came back without an md5_image.
 *
 * Keyed by slug, because the uploaded filenames do not all match it
 * (soga-jamaile is stored as soga-gamale.jpg). All six are 1000x1000.
 */
const LOCAL_COVERS = {
  "soga-jamaile": "/images/albums/soga-gamale.jpg",
  "revolt-for-change": "/images/albums/revolt-for-change.png",
  "love-and-struggle": "/images/albums/love-and-struggle.jpg",
  diversity: "/images/albums/diversity.jpg",
  salam: "/images/albums/salam.jpg",
  anasna: "/images/albums/anasna.jpg",
};

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
 * an upgrade path and never a requirement.
 */
const SPOTIFY_ALBUM_IDS = {
  "soga-jamaile": "0cuTRYEfi51fk7FjrcW6uY",
};

/**
 * The release shown in the "Featured album" block.
 *
 * Derived rather than pinned, so a new record takes the slot by itself. Singles
 * and EPs are skipped because the block is specifically about albums; if there
 * is no full-length at all, the newest release stands in.
 */
export function pickFeatured(albums) {
  if (!Array.isArray(albums) || albums.length === 0) return null;
  return albums.find((a) => a.recordType === "album") || albums[0];
}

/**
 * Primary genre for a release, from Deezer's album detail.
 *
 * Deezer often returns an empty genre list for independent releases, so the
 * caller supplies the fallback. Kept here so both pages agree.
 */
export function genreOf(detail) {
  return detail?.genres?.data?.[0]?.name || null;
}

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
 * with the layout rather than being pinned to the API's four preset sizes. The
 * trailing `-80-` is the quality segment and is deliberately fixed: Deezer only
 * accepts certain values and answers 302 to others, so it is not exposed here.
 *
 * With no Deezer cover, falls back to the locally hosted file for that slug.
 */
export function coverUrl(album, width = 700) {
  if (album?.coverMd5) {
    return `https://${DEEZER_IMAGE_HOST}/images/cover/${album.coverMd5}/${width}x${width}-000000-80-0-0.jpg`;
  }
  return LOCAL_COVERS[album?.slug] || null;
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
 * Used only when Deezer cannot be reached during the build. Cover art for these
 * comes from LOCAL_COVERS above, so the fallback needs no network at all.
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
  },
];
