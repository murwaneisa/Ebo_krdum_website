import { cmsFetch } from "./cms";

/*
 * Press reviews, from Sanity.
 *
 * The `review` type holds one document per language: reviewerName, reviewText,
 * reviewLang, reviewLink and reviewerLogo. The ten documents are really five
 * articles, each written once in Swedish and once translated to English, and
 * the two halves of a pair carry the identical reviewLink.
 *
 * So they are grouped by reviewLink rather than by reviewerName -- the names
 * disagree across a pair (LIRA vs Lira Magazine), the links never do. Grouping
 * is what lets the English/Svenska toggle switch a card between translations
 * instead of listing the same article twice.
 */

const QUERY = `*[_type == "review" && defined(reviewLink) && defined(reviewText)]{
  _id,
  _createdAt,
  reviewerName,
  reviewText,
  reviewLang,
  reviewLink,
  "logo": reviewerLogo.asset->{
    "src": url,
    "isOpaque": metadata.isOpaque,
    "width": metadata.dimensions.width,
    "height": metadata.dimensions.height
  }
}`;

/* reviewLang is free text and inconsistent: "Swedish translated to English",
 * "Swedish, translated to English", "Swedish". Only the word matters. */
const isEnglish = (lang) => /english/i.test(String(lang || ""));

/** Sanity CDN URL for a logo, capped by height so wide marks stay legible. */
function logoOf(asset) {
  if (!asset?.src) return null;
  return {
    src: `${asset.src}?h=120&fit=max&q=80`,
    // Opaque logos carry their own background and must render untouched.
    // Transparent ones are a mix of black and white artwork, so they get
    // normalised to a single colour in ReviewLogo.
    isOpaque: asset.isOpaque === true,
    width: asset.width ?? null,
    height: asset.height ?? null,
  };
}

/**
 * Reviews, newest first, one entry per article with both translations attached.
 *
 * Ordering is by `_createdAt`, which is when the text was entered in Sanity --
 * the schema has no publication-date field, so this is "most recently added",
 * not "most recently published".
 *
 * Returns [] rather than throwing when Sanity is unreachable or unconfigured,
 * and both pages hide their section when the list is empty.
 */
export async function getReviews({ limit } = {}) {
  const docs = await cmsFetch(QUERY, {}, []);
  if (!Array.isArray(docs) || docs.length === 0) return [];

  const byArticle = new Map();

  for (const doc of docs) {
    const key = doc.reviewLink;
    const entry = byArticle.get(key) || {
      id: key,
      url: key,
      outlet: null,
      logo: null,
      en: null,
      sv: null,
      addedAt: doc._createdAt || "",
    };

    if (isEnglish(doc.reviewLang)) {
      entry.en = doc.reviewText;
      // The English name is the one shown, since the site reads English first.
      entry.outlet = doc.reviewerName || entry.outlet;
    } else {
      entry.sv = doc.reviewText;
      entry.outlet = entry.outlet || doc.reviewerName;
    }

    entry.logo = entry.logo || logoOf(doc.logo);
    if ((doc._createdAt || "") > entry.addedAt) entry.addedAt = doc._createdAt;

    byArticle.set(key, entry);
  }

  const all = [...byArticle.values()].sort((a, b) =>
    String(b.addedAt).localeCompare(String(a.addedAt))
  );

  return typeof limit === "number" ? all.slice(0, limit) : all;
}

/** Text for the requested language, falling back to the other translation. */
export function textFor(review, lang) {
  if (!review) return "";
  return (lang === "sv" ? review.sv || review.en : review.en || review.sv) || "";
}

/** True when the card is showing a translation the reader did not ask for. */
export function isFallback(review, lang) {
  if (!review) return false;
  return lang === "sv" ? !review.sv && !!review.en : !review.en && !!review.sv;
}
