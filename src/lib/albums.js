/*
 * Discography.
 *
 * This is the fallback used when the Spotify Web API is unreachable or
 * credentials are absent — see lib/spotify.js. When Spotify does answer, its
 * albums are merged over this list by normalised title, so the slugs and cover
 * art stay stable even if Spotify reorders or re-releases something.
 */

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "6y0e37tr";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const CDN = `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/`;

export const FEATURED_SLUG = "soga-jamaile";

export const DISCOGRAPHY = [
  {
    slug: "soga-jamaile",
    title: "Soga Jamailé",
    year: "2023",
    cover: "8972cbd4e4cbdac4c1c3892a25f14556e16a336c-3000x3000.jpg",
    spotifyAlbumId: "0cuTRYEfi51fk7FjrcW6uY",
  },
  {
    slug: "revolt-for-change",
    title: "Revolt For Change",
    year: "2022",
    cover: "dbdc8fdfcb93fd4c4e0301380176093c1295ec03-3000x3000.png",
  },
  {
    slug: "love-and-struggle",
    title: "Love & Struggle",
    year: "2022",
    cover: "8f0d7e8b8c8eed8276b2e1b0e0b706d80dbbd2d8-1080x1080.jpg",
  },
  { slug: "diversity", title: "Diversity", year: "2021", cover: "bf55c2004612bc959b6621207806d36caf6e4392-1400x1400.jpg" },
  { slug: "salam", title: "Salam", year: "2019", cover: "574e30717e3d18b342c3d6037207eeb1f86cc641-1400x1400.jpg" },
  { slug: "anasna", title: "Anasna", year: "2018", cover: "cde6b1a8623a6a55e0d362e9956836a2ca4dd250-1400x1400.jpg" },
];

/** Sanity CDN URL for an album cover, sized for the requested width. */
export function coverUrl(album, width = 700, quality = 80) {
  if (!album?.cover) return null;
  return `${CDN}${album.cover}?w=${width}&q=${quality}`;
}

const normalise = (s) =>
  String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]/g, "");

/**
 * Merge live Spotify albums over the local list.
 *
 * Local entries are authoritative for slug and cover art; Spotify contributes
 * its album id (so the embed and tracklist work) and can add releases that are
 * not in the local list yet.
 */
export function mergeWithSpotify(spotifyAlbums) {
  if (!Array.isArray(spotifyAlbums) || spotifyAlbums.length === 0) {
    return DISCOGRAPHY.map((a, i) => ({ ...a, num: String(i + 1).padStart(2, "0") }));
  }

  const byTitle = new Map(spotifyAlbums.map((a) => [normalise(a.name), a]));
  const claimed = new Set();

  const merged = DISCOGRAPHY.map((local) => {
    const hit = byTitle.get(normalise(local.title));
    if (hit) claimed.add(hit.id);
    return {
      ...local,
      spotifyAlbumId: hit?.id || local.spotifyAlbumId || null,
      year: hit?.release_date?.slice(0, 4) || local.year,
    };
  });

  const extras = spotifyAlbums
    .filter((a) => !claimed.has(a.id))
    .map((a) => ({
      slug: normalise(a.name).slice(0, 60) || a.id,
      title: a.name,
      year: a.release_date?.slice(0, 4) || "",
      cover: null,
      remoteCover: a.images?.[0]?.url || null,
      spotifyAlbumId: a.id,
    }));

  return [...merged, ...extras]
    .sort((a, b) => Number(b.year || 0) - Number(a.year || 0))
    .map((a, i) => ({ ...a, num: String(i + 1).padStart(2, "0") }));
}
