/*
 * Renders the press kit (bio + quotes) to a PDF buffer.
 *
 * Kept apart from the API route so the layout can be exercised directly, and so
 * the route is left with only HTTP concerns.
 *
 * pdfkit rather than a React PDF renderer: plain Node, no coupling to the app's
 * React version, and no headless browser to run in a serverless function.
 */
import PDFDocument from "pdfkit";
import { CONTACT } from "@/data/site";

// Ink on cream with bronze accents, echoing the site.
const INK = "#241A10";
const ACCENT = "#8B5A2B";
const MUTED = "#6B6053";

const MARGIN = 64;

/** @returns {Promise<Buffer>} */
export function buildPressKitPdf({ bio = [], quotes = [] } = {}) {
  const doc = new PDFDocument({
    size: "A4",
    margin: MARGIN,
    // Required for the footer pass: without it bufferedPageRange() only ever
    // reports the current page and switchToPage() throws.
    bufferPages: true,
    info: {
      Title: "Ebo Krdum — Bio & quotes",
      Author: "Ebo Krdum",
      Subject: "Press kit",
    },
  });

  /*
   * Collected into a buffer rather than piped straight to the response: a
   * failure mid-render then still leaves the caller able to send an error,
   * instead of a truncated PDF the browser would download and fail to open.
   */
  const chunks = [];
  doc.on("data", (c) => chunks.push(c));

  const done = new Promise((resolve, reject) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
  });

  const width = doc.page.width - MARGIN * 2;

  doc
    .font("Helvetica-Bold")
    .fontSize(26)
    .fillColor(INK)
    .text("EBO KRDUM", { characterSpacing: 2 });

  doc
    .moveDown(0.25)
    .font("Helvetica")
    .fontSize(10)
    .fillColor(ACCENT)
    .text("PRESS BIO & QUOTES", { characterSpacing: 2.4 });

  doc
    .moveDown(0.9)
    .moveTo(MARGIN, doc.y)
    .lineTo(MARGIN + width, doc.y)
    .lineWidth(1)
    .strokeColor(ACCENT)
    .stroke();

  doc.moveDown(1.4);

  if (bio.length) {
    for (const para of bio) {
      doc
        .font("Helvetica")
        .fontSize(11)
        .fillColor(INK)
        .text(para, MARGIN, doc.y, { width, align: "left", lineGap: 3.5 });
      doc.moveDown(0.85);
    }
  } else {
    doc
      .font("Helvetica-Oblique")
      .fontSize(11)
      .fillColor(MUTED)
      .text("The biography has not been written yet.", MARGIN, doc.y, { width });
    doc.moveDown(0.85);
  }

  if (quotes.length) {
    doc.moveDown(0.6);
    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor(ACCENT)
      .text("QUOTES", MARGIN, doc.y, { characterSpacing: 2.4 });
    doc.moveDown(0.8);

    for (const q of quotes) {
      // Keep a quote and its attribution together rather than splitting them
      // across a page break.
      if (doc.y > doc.page.height - MARGIN - 90) doc.addPage();

      const top = doc.y;
      doc
        .font("Helvetica-Oblique")
        .fontSize(12)
        .fillColor(INK)
        .text(`“${q.text}”`, MARGIN + 14, top, {
          width: width - 14,
          lineGap: 3,
        });

      // The amber rule beside the quote, drawn once its height is known.
      doc
        .moveTo(MARGIN, top)
        .lineTo(MARGIN, doc.y)
        .lineWidth(2)
        .strokeColor(ACCENT)
        .stroke();

      if (q.source) {
        doc
          .moveDown(0.35)
          .font("Helvetica")
          .fontSize(9.5)
          .fillColor(MUTED)
          .text(`— ${q.source}`, MARGIN + 14, doc.y, { width: width - 14 });
      }
      doc.moveDown(1.1);
    }
  }

  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    /*
     * The footer sits below the bottom margin, and writing there makes pdfkit
     * helpfully add another page — which is how an empty kit ended up two
     * pages long. Dropping the bottom margin for the duration of the write
     * suppresses that; it is restored immediately after.
     */
    const bottom = doc.page.margins.bottom;
    doc.page.margins.bottom = 0;
    doc
      .font("Helvetica")
      .fontSize(8.5)
      .fillColor(MUTED)
      .text(
        `ebokrdum.com · ${CONTACT.press} · ${CONTACT.phone}`,
        MARGIN,
        doc.page.height - MARGIN + 16,
        { width, align: "left", lineBreak: false }
      );
    doc.page.margins.bottom = bottom;
  }

  doc.end();
  return done;
}
