/*
 * The "Bio & quotes" download, built from the text in Sanity on each request.
 *
 * Nothing is stored: the artist types the bio and quotes once in the CMS, the
 * press page renders them, and this route renders the same content as a PDF.
 * There is no uploaded file to fall out of sync, and no asset consuming Sanity
 * storage — which matters on the free plan, where replacing an upload leaves
 * the old copy behind.
 */
import { getPressKit } from "@/lib/press";
import { buildPressKitPdf } from "@/lib/pressPdf";

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  let pdf;
  try {
    pdf = await buildPressKitPdf(await getPressKit());
  } catch (err) {
    console.error("[press-kit.pdf]", err.message);
    res.status(502).json({ error: "The press kit is unavailable right now." });
    return;
  }

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    'inline; filename="ebo-krdum-bio-and-quotes.pdf"'
  );
  res.setHeader("Content-Length", pdf.length);
  // Regenerated from the CMS, so cache at the edge but let an edit surface
  // quickly — the same window as the revalidate on /press.
  res.setHeader(
    "Cache-Control",
    "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400"
  );
  res.status(200).send(pdf);
}
