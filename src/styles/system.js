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
    // Stops iOS Safari inflating text on rotation, which would fight the
    // fluid scale below. Keeps the user's own default font size intact.
    html: { WebkitTextSizeAdjust: "100%", textSizeAdjust: "100%" },
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
    /*
     * Staggered entrance for the mobile menu links. The per-item delay is set
     * inline by MobileNav; reduced-motion drops the animation entirely, which
     * leaves each link at its natural opacity and position.
     */
    "@keyframes navItemIn": {
      from: { opacity: 0, transform: "translateY(0.5rem)" },
      to: { opacity: 1, transform: "none" },
    },
    "[data-nav-item]": { animation: "navItemIn 0.34s ease both" },
    "@media (prefers-reduced-motion: reduce)": {
      "[data-nav-item]": { animation: "none" },
    },
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
        // 85rem = 1360px at the default root size, and it grows with the
        // reader's font size so the content column never squeezes the text.
        shell: { value: "85rem" },
      },
      spacing: {
        gutter: { value: "clamp(1.125rem, 4vw, 2.5rem)" },
      },
      /*
       * Fluid type scale. Every step interpolates between its size at a
       * 360px viewport and its size at 1360px (= the `shell` width), then
       * locks at both ends.
       *
       * The middle term is `rem + vw`, never bare `vw`: the rem part keeps
       * text scaling when someone raises their browser's default font size
       * or zooms, which pure-vw sizing silently ignores (WCAG 1.4.4).
       */
      fontSizes: {
        "2xs": { value: "clamp(0.688rem, 0.665rem + 0.10vw, 0.750rem)" }, // 11 → 12
        xs: { value: "clamp(0.750rem, 0.728rem + 0.10vw, 0.813rem)" }, //    12 → 13
        sm: { value: "clamp(0.813rem, 0.768rem + 0.20vw, 0.938rem)" }, //    13 → 15
        md: { value: "clamp(0.938rem, 0.893rem + 0.20vw, 1.063rem)" }, //    15 → 17  body
        lg: { value: "clamp(1.063rem, 0.995rem + 0.30vw, 1.250rem)" }, //    17 → 20
        xl: { value: "clamp(1.250rem, 1.160rem + 0.40vw, 1.500rem)" }, //    20 → 24
        "2xl": { value: "clamp(1.500rem, 1.365rem + 0.60vw, 1.875rem)" }, // 24 → 30
        "3xl": { value: "clamp(1.750rem, 1.480rem + 1.20vw, 2.500rem)" }, // 28 → 40
        "4xl": { value: "clamp(2.000rem, 1.460rem + 2.40vw, 3.500rem)" }, // 32 → 56
        "5xl": { value: "clamp(2.375rem, 1.610rem + 3.40vw, 4.500rem)" }, // 38 → 72
        "6xl": { value: "clamp(2.750rem, 1.400rem + 6.00vw, 6.500rem)" }, // 44 → 104
        "7xl": { value: "clamp(3.250rem, 1.315rem + 8.60vw, 8.625rem)" }, // 52 → 138
      },
    },
    /*
     * Semantic bundles. Line-height and tracking are part of a type size,
     * not separate decisions — display sizes need tighter leading than body
     * copy, and that relationship should not be re-derived per component.
     */
    textStyles: {
      hero: {
        value: {
          fontFamily: "display",
          fontSize: "7xl",
          fontWeight: "600",
          lineHeight: "0.86",
          letterSpacing: "-0.02em",
        },
      },
      pageTitle: {
        value: {
          fontFamily: "display",
          fontSize: "6xl",
          fontWeight: "600",
          lineHeight: "0.88",
          letterSpacing: "-0.015em",
        },
      },
      sectionLg: {
        value: {
          fontFamily: "display",
          fontSize: "5xl",
          fontWeight: "500",
          lineHeight: "1",
          letterSpacing: "-0.01em",
        },
      },
      section: {
        value: {
          fontFamily: "display",
          fontSize: "4xl",
          fontWeight: "500",
          lineHeight: "1.04",
          letterSpacing: "-0.01em",
        },
      },
      sectionSm: {
        value: {
          fontFamily: "display",
          fontSize: "3xl",
          fontWeight: "500",
          lineHeight: "1.08",
        },
      },
      cardTitle: {
        value: { fontFamily: "display", fontSize: "xl", lineHeight: "1.2" },
      },
      lead: {
        value: { fontSize: "lg", lineHeight: "1.6" },
      },
      body: {
        value: { fontSize: "md", lineHeight: "1.75" },
      },
      meta: {
        value: { fontSize: "sm", lineHeight: "1.6" },
      },
      // The uppercase amber/bronze labels used above nearly every section.
      eyebrow: {
        value: {
          fontSize: "xs",
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          lineHeight: "1.4",
        },
      },
      microLabel: {
        value: {
          fontSize: "2xs",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          lineHeight: "1.4",
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
export default system;
