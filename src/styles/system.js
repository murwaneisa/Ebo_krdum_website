import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

/*
 * Design tokens extracted from the Claude Design project
 * "Ebo Krdum music website" (28dac21e-2202-40f1-a360-564ec61cede8).
 *
 * Chakra v3 requires every token to be wrapped as `{ value: ... }`.
 * The font tokens read CSS variables injected by next/font in _app.js.
 */
const config = defineConfig({
  globalCss: {
    "*, *::before, *::after": { boxSizing: "border-box" },
    body: {
      margin: 0,
      bg: "ink",
      color: "cream",
      fontFamily: "body",
      WebkitFontSmoothing: "antialiased",
    },
    a: { color: "amber", textDecoration: "none" },
    "a:hover": { color: "amberBright" },
    "::selection": { bg: "bronze", color: "cream" },
    // Horizontal album shelf on the homepage
    "[data-shelf]::-webkit-scrollbar": { height: "6px" },
    "[data-shelf]::-webkit-scrollbar-track": { bg: "surface2" },
    "[data-shelf]::-webkit-scrollbar-thumb": { bg: "bronze" },
  },
  theme: {
    tokens: {
      colors: {
        ink: { value: "#241A10" },
        surface: { value: "#2B1E13" },
        surface2: { value: "#2E2115" },
        cream: { value: "#F7EFDD" },
        amber: { value: "#E8A93A" },
        amberBright: { value: "#F5C242" },
        bronze: { value: "#8B5A2B" },
        bronzeDark: { value: "#6B4226" },
        shadow: { value: "#140E08" },
      },
      fonts: {
        display: { value: "var(--font-display), Georgia, serif" },
        body: { value: "var(--font-body), system-ui, sans-serif" },
        mono: { value: "ui-monospace, 'SF Mono', Menlo, monospace" },
      },
      sizes: {
        shell: { value: "1360px" },
      },
      spacing: {
        gutter: { value: "clamp(18px, 4vw, 40px)" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
export default system;
