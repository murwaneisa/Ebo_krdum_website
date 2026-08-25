import { getAlbumPreviews } from "@/lib/deezer";

/*
 * Fresh preview URLs for one release.
 *
 * Exists because Deezer signs preview MP3 links with a 15-minute expiry and
 * returns 403 afterwards. The album pages are statically prerendered and
 * revalidate hourly, so a preview baked into that HTML would be dead for most
 * of every hour. The player calls this route when the visitor presses play.
 *
 * Cached for 5 minutes — comfortably inside Deezer's window, while still
 * absorbing repeat presses.
 */
export default async function handler(req, res) {
  const { albumId } = req.query;

  if (!/^\d+$/.test(String(albumId))) {
    return res.status(400).json({ error: "albumId must be a Deezer album id" });
  }

  const previews = await getAlbumPreviews(albumId);

  if (previews.length === 0) {
    // Deezer unreachable, or the release has no playable previews.
    res.setHeader("Cache-Control", "no-store");
    return res.status(502).json({ error: "no previews available", previews: [] });
  }

  res.setHeader("Cache-Control", "public, max-age=300, s-maxage=300");
  return res.status(200).json({ previews });
}
