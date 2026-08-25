# Where album and music data comes from

**Deezer, for everything.** Spotify is used only for its embed player, never as
a data source. Sanity holds no album or music data at all.

A new release needs no CMS entry and no deploy: it appears on the homepage shelf
and gets its own detail page within the hour.

## Sources

| Shown on the site | Comes from |
|---|---|
| Title | Deezer |
| Cover art | Deezer — any square size, built from `md5_image` |
| Release date / year | Deezer |
| Tracklist, durations | Deezer |
| Track count | Deezer (`nb_tracks`) |
| Genre | Deezer (`genres`), falling back to "Desert blues" |
| Which album is featured | Derived — newest `record_type === "album"` |
| The player | Spotify embed if a Spotify id is known, else the Deezer widget |

Sanity still serves the rest of the site — show dates, the hero image, the
biography portrait — but nothing about music.

## No credentials anywhere

`https://api.deezer.com` is public: no API key, no OAuth, no account. Spotify
embeds are public iframes. Nothing in this flow reads an environment variable.

The Spotify Web API is deliberately unused: since Feb 2026 it requires the app
owner to hold an active Premium subscription, returns `null` for `preview_url`
under Client Credentials, and dropped `/artists/{id}/top-tracks`.

## The two hand-maintained maps

Both live in `src/lib/albums.js` and both are optional.

`RELEASE_OVERRIDES` — fixes a bad Deezer title or pins a slug. Used for Salam
and Anasna, whose Deezer titles carry an unfinished "(Genuine Mezziga with)"
credit, and to keep their existing URLs working.

`SPOTIFY_ALBUM_IDS` — slug to Spotify album id, for releases that should use the
Spotify player. Anything missing falls back to the Deezer widget, so this is an
upgrade path and never a requirement. Currently one entry, `soga-jamaile`.

## Failure behaviour

Deezer signals failure three ways and only one is an HTTP error:

- non-2xx status
- HTTP 200 with `{ error: { ... } }` — unknown album id
- HTTP 200 with `{ data: [], total: 0 }` — unknown artist id

All three are normalised to `null` in `src/lib/deezer.js`. If Deezer is
unreachable at build time the site falls back to `FALLBACK_ALBUMS`, logs each
failure and still prerenders.

## IDs

Artist `77304962` (`src/data/site.js`).

| Release | Deezer album id | Slug |
|---|---|---|
| Umbélé (Honey Dijon Remix) | 751323621 | `umbele-honey-dijon-remix` |
| Umbélé | 571672931 | `umbele` |
| Soga Jamailé | 480399835 | `soga-jamaile` |
| Warfree World | 430332767 | `warfree-world` |
| Revolt for Change | 376116257 | `revolt-for-change` |
| Love & Struggle | 305235457 | `love-and-struggle` |
| Anny Ma Shedy | 271584522 | `anny-ma-shedy` |
| Diversity | 328368067 | `diversity` |
| Anasna | 127107212 | `anasna` |
| Salam | 116699982 | `salam` |
