/*
 * Spotify Web API — server-side only (Client Credentials flow).
 *
 * IMPORTANT: every export here fails soft. If credentials are missing or the API
 * errors, these return null/[] and log a warning rather than throwing, so
 * `next build` still prerenders with the local fallback in lib/albums.js.
 *
 * Known constraints (Spotify Web API, February 2026):
 *  - GET /artists/{id}/top-tracks was REMOVED for Development Mode apps. The
 *    homepage "Listen" section uses the Spotify embed iframe instead.
 *  - `preview_url` is null under Client Credentials, so 30-second previews
 *    cannot come from here.
 *  - Development Mode requires the app owner to hold an active Premium
 *    subscription or the app stops working.
 */

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const API = "https://api.spotify.com/v1";

let cachedToken = null; // { value, expiresAt }

function credentials() {
  const id = process.env.SPOTIFY_CLIENT_ID;
  const secret = process.env.SPOTIFY_CLIENT_SECRET;
  return id && secret ? { id, secret } : null;
}

export function isSpotifyConfigured() {
  return credentials() !== null;
}

async function getAccessToken() {
  const creds = credentials();
  if (!creds) return null;

  if (cachedToken && cachedToken.expiresAt > Date.now() + 30_000) {
    return cachedToken.value;
  }

  try {
    const basic = Buffer.from(`${creds.id}:${creds.secret}`).toString("base64");
    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    if (!res.ok) {
      console.warn(`[spotify] token request failed: ${res.status} ${res.statusText}`);
      return null;
    }

    const json = await res.json();
    cachedToken = {
      value: json.access_token,
      expiresAt: Date.now() + (json.expires_in ?? 3600) * 1000,
    };
    return cachedToken.value;
  } catch (err) {
    console.warn("[spotify] token request threw:", err.message);
    return null;
  }
}

async function api(path) {
  const token = await getAccessToken();
  if (!token) return null;

  try {
    const res = await fetch(`${API}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      console.warn(`[spotify] GET ${path} failed: ${res.status} ${res.statusText}`);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.warn(`[spotify] GET ${path} threw:`, err.message);
    return null;
  }
}

/**
 * Albums and singles for an artist, newest first, de-duplicated by name.
 * Spotify returns one entry per market/re-release, so collapsing by name is
 * required or the discography shows the same record several times.
 */
export async function getArtistAlbums(artistId) {
  const json = await api(
    `/artists/${artistId}/albums?include_groups=album,single&limit=50`
  );
  if (!json?.items) return [];

  const seen = new Map();
  for (const item of json.items) {
    const key = item.name.toLowerCase();
    const existing = seen.get(key);
    // keep the earliest release date for a given title
    if (!existing || (item.release_date || "") < (existing.release_date || "")) {
      seen.set(key, item);
    }
  }

  return [...seen.values()].sort((a, b) =>
    (b.release_date || "").localeCompare(a.release_date || "")
  );
}

/** Tracklist for one album, shaped for the Album page. */
export async function getAlbumTracks(albumId) {
  if (!albumId) return [];
  const json = await api(`/albums/${albumId}/tracks?limit=50`);
  if (!json?.items) return [];

  return json.items.map((t, i) => ({
    num: String(i + 1).padStart(2, "0"),
    title: t.name,
    time: msToTime(t.duration_ms),
  }));
}

function msToTime(ms) {
  if (!ms && ms !== 0) return "";
  const total = Math.round(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
