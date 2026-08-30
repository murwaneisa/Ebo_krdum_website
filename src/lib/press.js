/*
 * Press kit content, from the `pressPage` singleton in Sanity.
 *
 * Shared deliberately: /press renders this and /api/press-kit.pdf builds the
 * download from the same query, so the page and the PDF can never disagree.
 * Nothing here is required — every field is optional in the CMS, so each
 * getter degrades to an empty value rather than throwing.
 */
import { cmsFetch, imageUrl } from "./cms";

/*
 * `image` is kept whole so imageUrl() can size it; `aspect` comes from Sanity's
 * own asset metadata, which is why the artist never types a ratio. The PDF file
 * is dereferenced to a URL here rather than rebuilt from the asset ref.
 */
const QUERY = `*[_type == "pressPage"][0]{
  photos[]{
    credit,
    caption,
    image,
    "aspect": image.asset->metadata.dimensions.aspectRatio
  },
  "stagePlotsUrl": stagePlots.asset->url,
  bio,
  quotes[]{ text, source }
}`;

/*
 * File extension of a Sanity image, read off the asset ref — these look like
 * `image-<id>-<width>x<height>-<format>`. Used only to name the download
 * sensibly; falls back to jpg when the ref is not the expected shape.
 */
function formatOf(image) {
  const parts = String(image?.asset?._ref || "").split("-");
  return parts.length >= 4 ? parts[parts.length - 1] : "jpg";
}

/** Flatten Portable Text blocks to plain paragraphs. */
export function blocksToParagraphs(blocks = []) {
  if (!Array.isArray(blocks)) return [];
  return blocks
    .filter((b) => b?._type === "block")
    .map((b) => (b.children || []).map((c) => c.text || "").join(""))
    .map((t) => t.trim())
    .filter(Boolean);
}

/**
 * The press kit, already shaped for rendering.
 *
 * Photos carry both a grid-sized `src` and a larger `full` for the lightbox,
 * derived from one upload. `stagePlots` falls back to the file committed under
 * public/files so the download keeps working until the artist uploads one.
 */
export async function getPressKit() {
  const data = await cmsFetch(QUERY, {}, null);

  const photos = (data?.photos || [])
    .filter((p) => p?.image?.asset?._ref)
    .map((p, i) => {
      const n = String(i + 1).padStart(2, "0");
      const full = imageUrl(p.image, 2400, 88);
      return {
        id: `press-${n}`,
        src: imageUrl(p.image, 1000, 82),
        full,
        /*
         * The HTML `download` attribute is ignored cross-origin, so a plain
         * link to the CDN opens the photo instead of saving it. Sanity's `dl`
         * parameter sets Content-Disposition: attachment server-side, which
         * works from any origin — and names the file while it is at it.
         */
        download: `${full}&dl=${encodeURIComponent(
          `ebo-krdum-press-${n}.${formatOf(p.image)}`
        )}`,
        credit: p.credit || "",
        caption: p.caption || "",
        ratio: p.aspect || 1,
      };
    });

  return {
    photos,
    stagePlotsUrl: data?.stagePlotsUrl || "/files/stage_plots.pdf",
    bio: blocksToParagraphs(data?.bio),
    quotes: (data?.quotes || [])
      .filter((q) => q?.text)
      .map((q) => ({ text: q.text.trim(), source: q.source || "" })),
  };
}
