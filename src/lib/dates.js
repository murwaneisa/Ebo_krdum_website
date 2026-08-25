/* Date formatting for show listings, matching the Claude Design artboards. */

const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
const WEEKDAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

/** Parse a Sanity show into the shape the listing components expect. */
function toShow(raw) {
  if (!raw?.showDate) return null;
  const date = new Date(raw.showDate);
  if (Number.isNaN(date.getTime())) return null;

  const hasTime = /T\d{2}:\d{2}/.test(String(raw.showDate));
  const time = date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  return {
    id: raw._id || `${raw.showTitle}-${raw.showDate}`,
    ts: date.getTime(),
    month: MONTHS[date.getMonth()],
    day: String(date.getDate()).padStart(2, "0"),
    year: String(date.getFullYear()),
    weekday: WEEKDAYS[date.getDay()],
    when: hasTime ? `${WEEKDAYS[date.getDay()]} at ${time}` : WEEKDAYS[date.getDay()],
    title: raw.showTitle || "Untitled show",
    place: [raw.showCity, raw.showCountry].filter(Boolean).join(", "),
    url: raw.showBookingLink || null,
  };
}

/** Split into future/past, each sorted for display. */
export function partitionShows(rawShows = []) {
  const now = Date.now();
  const shows = rawShows.map(toShow).filter(Boolean);

  const upcoming = shows.filter((s) => s.ts >= now).sort((a, b) => a.ts - b.ts);
  const past = shows.filter((s) => s.ts < now).sort((a, b) => b.ts - a.ts);

  return { upcoming, past, total: shows.length };
}

/** Group past shows by year, newest year first. */
export function groupByYear(shows = []) {
  const byYear = new Map();
  for (const s of shows) {
    if (!byYear.has(s.year)) byYear.set(s.year, []);
    byYear.get(s.year).push(s);
  }
  return [...byYear.entries()]
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([year, list]) => ({
      year,
      shows: list,
      count: `${list.length} ${list.length === 1 ? "show" : "shows"}`,
    }));
}
