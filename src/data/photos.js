/*
 * Photo sets for /press and /gallery.
 *
 * The image files live in the Claude Design project and are not in this repo or
 * in Sanity yet. Drop them into public/images/press and public/images/gallery
 * (or point `src`/`full` at Sanity CDN URLs) and the grids fill in — the pages
 * already render an empty frame for any entry whose file is missing.
 */

export const PRESS_PHOTOS = [
  { id: "press-01", src: "/images/press/press-01-olof-grind-2-1000.jpg", full: "/images/press/press-01-olof-grind-2.jpg", credit: "Photo: Olof Grind", caption: "Ebo Krdum sitting on a stage riser with his guitar", ratio: 0.7865 },
  { id: "press-02", src: "/images/press/press-02-olof-grind-1000.jpg", full: "/images/press/press-02-olof-grind.jpg", credit: "Photo: Olof Grind", caption: "Ebo Krdum portrait against a yellow wall", ratio: 0.7899 },
  { id: "press-03", src: "/images/press/press-03-womex-peter-bothen-1000.jpg", full: "/images/press/press-03-womex-peter-bothen.jpg", credit: "Photo: Peter Bothen", caption: "Ebo Krdum and band live at WOMEX", ratio: 1.4997 },
  { id: "press-04", src: "/images/press/press-04-olof-grind-030-1000.jpg", full: "/images/press/press-04-olof-grind-030.jpg", credit: "Photo: Olof Grind", caption: "Ebo Krdum lying on a brick floor with guitar and percussion", ratio: 0.7865 },
];

export const PRESS_DOWNLOADS = [
  { kind: "PDF", title: "Stage plots & rider", note: "Solo, trio and full band setups. Opens in a new tab.", href: "/files/stage_plots.pdf" },
  { kind: "PDF", title: "Bio & quotes", note: "Press release in English. Opens in a new tab.", href: "/files/release_En.pdf" },
];

/*
 * `Video` is last on purpose: it swaps the grid to 16:9 embeds, so it reads as
 * a mode change rather than another slice of the photo set.
 */
export const GALLERY_CATEGORIES = [
  { key: "All", label: "All photos" },
  { key: "Live", label: "Live" },
  { key: "Portrait", label: "Portraits" },
  { key: "Behind", label: "Behind the scenes" },
  { key: "Video", label: "Video" },
];

export const GALLERY_PHOTOS = [
  { id: "g01", cat: "Live", caption: "On stage under stage light", slot: "live performance", ratio: 1.41, src: "/images/gallery/gallery-live-01.jpeg" },
  { id: "g02", cat: "Portrait", caption: "Seated with acoustic guitar", slot: "portrait — Olof Grind", ratio: 0.77, src: "/images/gallery/gallery-portrait-01-thumb.jpg", full: "/images/gallery/gallery-portrait-01.jpg" },
  { id: "g03", cat: "Portrait", caption: "Yellow wall", slot: "portrait — Olof Grind", ratio: 0.85, src: "/images/gallery/gallery-portrait-02-thumb.jpg", full: "/images/gallery/gallery-portrait-02.jpg" },
  { id: "g04", cat: "Portrait", caption: "Arms crossed, studio", slot: "portrait", ratio: 1.5, src: "/images/gallery/ebo-hero.jpeg" },
  { id: "g05", cat: "Portrait", caption: "Love & Struggle session", slot: "portrait — square", ratio: 1.0, src: "/images/gallery/gallery-portrait-03.jpeg" },
  { id: "g06", cat: "Behind", caption: "Resting with guitar, gojo and calabash", slot: "behind the scenes", ratio: 0.78, src: "/images/gallery/gallery-portrait-04.jpeg" },
  { id: "g07", cat: "Live", caption: "WOMEX, full band", slot: "live — Peter Bothen", ratio: 1.5, src: "/images/gallery/gallery-live-womex-thumb.jpg", full: "/images/gallery/gallery-live-womex.jpg" },
  { id: "g08", cat: "Live", caption: "Stallet, Stockholm", slot: "live — varldens musik", ratio: 1.82, src: "/images/gallery/gallery-live-stallet-thumb.jpg", full: "/images/gallery/gallery-live-stallet.jpg" },
  { id: "g09", cat: "Portrait", caption: "Pink wall", slot: "portrait", ratio: 0.79, src: "/images/gallery/gallery-portrait-pink-thumb.jpg", full: "/images/gallery/gallery-portrait-pink.jpg" },
  { id: "g10", cat: "Portrait", caption: "Profile, magenta light", slot: "portrait", ratio: 0.79, src: "/images/gallery/gallery-portrait-magenta-thumb.jpg", full: "/images/gallery/gallery-portrait-magenta.jpg" },
  { id: "g11", cat: "Portrait", caption: "Ochre wall", slot: "portrait", ratio: 0.79, src: "/images/gallery/gallery-portrait-ochre-thumb.jpg", full: "/images/gallery/gallery-portrait-ochre.jpg" },
];
