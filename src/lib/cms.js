/*
 * Resilient Sanity access for the redesigned pages.
 *
 * lib/sanityClient.js (used by the legacy v1 pages) constructs its client at
 * import time and throws when NEXT_PUBLIC_SANITY_PROJECT_ID is absent, which
 * takes the whole build down. This wrapper degrades to a caller-supplied
 * fallback instead, so `next build` succeeds on a machine with no env file.
 */
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

let client = null;

if (projectId) {
  client = createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    useCdn: true,
  });
} else {
  console.warn(
    "[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is not set — CMS queries will return their fallback value."
  );
}

/** Run a GROQ query, returning `fallback` instead of throwing on any failure. */
export async function cmsFetch(query, params = {}, fallback = null) {
  if (!client) return fallback;
  try {
    const result = await client.fetch(query, params);
    return result ?? fallback;
  } catch (err) {
    console.warn("[sanity] query failed:", err.message);
    return fallback;
  }
}

/**
 * Build a CDN URL from a Sanity image object.
 * Asset refs look like: image-<id>-<dimensions>-<format>
 */
export function imageUrl(imageObj, width = 1600, quality = 80) {
  const ref = imageObj?.asset?._ref;
  if (!ref || !projectId) return null;
  const [, id, size, format] = ref.split("-");
  if (!id || !size || !format) return null;
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${size}.${format}?w=${width}&q=${quality}`;
}

/**
 * Like imageUrl, but also returns the aspect ratio.
 *
 * The asset ref carries the source dimensions (image-<id>-1400x1400-jpg), so
 * the masonry grid can read them straight off the reference — no editor has to
 * measure a photo and type a ratio in by hand.
 */
export function imageMeta(imageObj, width = 1600, quality = 80) {
  const ref = imageObj?.asset?._ref;
  if (!ref || !projectId) return null;
  const [, id, size, format] = ref.split("-");
  const [w, h] = String(size || "").split("x").map(Number);
  if (!id || !format || !w || !h) return null;
  return {
    url: `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${size}.${format}?w=${width}&q=${quality}`,
    ratio: Number((w / h).toFixed(4)),
  };
}

/**
 * Pull the video id out of any YouTube link an editor might paste — watch?v=,
 * youtu.be/, /embed/ and /shorts/ all appear in the wild. Returns null for
 * anything unrecognised so a bad link renders nothing rather than a broken frame.
 */
export function youtubeId(url) {
  if (!url) return null;
  const m = String(url).match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return m ? m[1] : null;
}
