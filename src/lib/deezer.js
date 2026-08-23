/*
 * Deezer public API — no authentication, no API key, no account required.
 * https://api.deezer.com
 *
 * This is the source of truth for album and track metadata (title, cover art,
 * release date, tracklist, duration). Playback stays on Spotify embeds where a
 * Spotify album id is known, because Spotify's Web API now requires a Premium
 * developer account; see components/home/AlbumPlayer.jsx.
 *
 * Every export fails soft. On a bad id, a network error or an API outage these
 * return [] / null and log a warning rather than throwing, so `next build`
 * still prerenders — using the fallback discography in lib/albums.js.
 *
 * Deezer signals failure in three different ways and only one of them is an
 * HTTP error, so checking `res.ok` alone is not enough:
 *   - a non-2xx status                          (rate limiting, outage)
 *   - HTTP 200 + { error: { type, message } }   (unknown album id)
 *   - HTTP 200 + { data: [], total: 0 }         (unknown artist id)
 * All three are normalised to null by `deezer()` below.
 */

const API = "https://api.deezer.com";

/** Cache window for album metadata: one hour. */
export const REVALIDATE_SECONDS = 3600;

async function deezer(path) {
  try {
    const res = await fetch(`${API}${path}`, {
      // Read by the App Router's extended fetch. The Pages Router ignores this
      // field — there ISR comes from `revalidate` in getStaticProps, which the
      // callers set to the same window. Kept here so the intent travels with
      // the request if these pages ever move to the App Router.
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      console.warn(`[deezer] GET ${path} failed: ${res.status} ${res.statusText}`);
      return null;
    }

    const json = await res.json();

    if (json?.error) {
      const { type, message, code } = json.error;
      console.warn(`[deezer] GET ${path} returned an error: ${type} ${code} — ${message}`);
      return null;
    }

    return json;
  } catch (err) {
    console.warn(`[deezer] GET ${path} threw:`, err.message);
    return null;
  }
}

/**
 * Every release for an artist, newest first.
 *
 * Returns albums, EPs and singles alike — `record_type` is carried through so
 * callers can group or filter. An unknown artist id yields [] rather than an
 * error, which surfaces as the empty state instead of a crash.
 */
export async function getArtistAlbums(deezerArtistId) {
  if (!deezerArtistId) return [];

  const json = await deezer(`/artist/${deezerArtistId}/albums?limit=100`);
  const items = json?.data;

  if (!Array.isArray(items) || items.length === 0) {
    if (json) console.warn(`[deezer] artist ${deezerArtistId} returned no releases`);
    return [];
  }

  return [...items].sort((a, b) =>
    String(b.release_date || "").localeCompare(String(a.release_date || ""))
  );
}

/** Full detail for one release: title, cover, release date, track count, label. */
export async function getAlbum(deezerAlbumId) {
  if (!deezerAlbumId) return null;
  return await deezer(`/album/${deezerAlbumId}`);
}

/**
 * Tracklist for one release, shaped for the album page.
 *
 * `/album/{id}` does carry `tracks.data` inline, but that copy is truncated for
 * long releases; this dedicated endpoint is the complete one.
 *
 * `preview` is a 30-second MP3 and is non-null here — unlike Spotify's
 * `preview_url`, which is always null under Client Credentials.
 */
export async function getAlbumTracks(deezerAlbumId) {
  if (!deezerAlbumId) return [];

  const json = await deezer(`/album/${deezerAlbumId}/tracks?limit=100`);
  const items = json?.data;
  if (!Array.isArray(items)) return [];

  return items.map((t, i) => ({
    id: t.id,
    num: String(t.track_position || i + 1).padStart(2, "0"),
    title: t.title,
    seconds: t.duration ?? null,
    time: secondsToTime(t.duration),
    preview: t.preview || null,
  }));
}

function secondsToTime(total) {
  if (typeof total !== "number" || Number.isNaN(total)) return "";
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
