# Sanity `album` schema — optional fields for the Deezer integration

> **Rule for this project:** all album and music *data* comes from Deezer.
> Spotify is used **only** for the embed player, never as a data source. The
> artist must never have to enter music data in Sanity for a release to show up
> correctly. New album/track fields belong in `src/lib/deezer.js`, not in a
> Sanity schema.

Album and track metadata now comes from the **Deezer public API**, so the site no
longer needs a Sanity entry per release. A new album appears by itself, with the
correct title, cover art, release date and tracklist.

Sanity keeps only what Deezer has no equivalent for. Both fields below are
**optional** — every page renders correctly with zero Sanity entries.

The Studio lives in a separate repository, so add these to its `album` schema by
hand.

## Fields to add

```js
// schemas/album.js — add to the existing `fields` array
{
  name: 'deezerAlbumId',
  title: 'Deezer album ID',
  type: 'string',
  description:
    'Links this editorial entry to a release. Find it in the Deezer URL: ' +
    'deezer.com/album/480399835 → 480399835. Leave empty to match on slug instead.',
},
{
  name: 'spotifyAlbumId',
  title: 'Spotify album ID',
  type: 'string',
  description:
    'Optional. When set, the page uses the Spotify player for this release. ' +
    'From the Spotify URL: open.spotify.com/album/0cuTRYEfi51fk7FjrcW6uY. ' +
    'Leave empty to use the Deezer player, which always works with no setup.',
},
```

`albumDescription` already exists and is still used, as the album blurb — the
one thing Deezer has no field for.

## What the artist no longer needs to maintain

The site reads exactly two fields from the `album` type: `albumDescription` and
`spotifyAlbumId`. Everything else Deezer supplies automatically, so these can be
left empty on new releases (and ignored on old ones):

| Was maintained by hand | Now from |
|---|---|
| Album title | Deezer |
| Cover art | Deezer (any square size, from `md5_image`) |
| Release date / year | Deezer |
| Tracklist and durations | Deezer |
| Track count | Deezer (`nb_tracks`) |
| Genre | Deezer (`genres`), falling back to "Desert blues" |
| Which album is featured | Derived — newest `record_type === "album"` |

A brand-new release needs **no Sanity entry at all**. It appears on the homepage
shelf and gets its own detail page within the hour.

## How the matching works

`getAlbumEditorial()` in `src/lib/cms.js` runs:

```groq
*[_type == "album" && (deezerAlbumId == $deezerAlbumId || albumSlug.current == $slug)][0]{
  albumDescription,
  spotifyAlbumId
}
```

It matches on `deezerAlbumId` first and falls back to the existing
`albumSlug.current`, so **entries written before this change keep working** —
that is how the Soga Jamailé blurb still renders today without any edit.

## Deezer IDs for the current releases

| Release | Deezer album ID | Slug |
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

Artist: `77304962` (`src/data/site.js`).

## Things that are code, not content

Two small maps in `src/lib/albums.js`, both optional:

- `RELEASE_OVERRIDES` — fixes a Deezer title or pins a slug. Currently used for
  Salam and Anasna, whose Deezer titles carry an unfinished
  "(Genuine Mezziga with)" credit, and to keep their existing URLs.
- `SPOTIFY_ALBUM_IDS` — an alternative to the Sanity `spotifyAlbumId` field, for
  ids you would rather keep in the repo.
