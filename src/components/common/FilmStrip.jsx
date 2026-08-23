import { Box } from "@chakra-ui/react";

/*
 * The recurring film-strip rule from the design (~12 uses across the artboards).
 * Two layered gradients: a horizontal band of colour stops, over a repeating
 * sprocket pattern. Kept as raw CSS because style props cannot express
 * multi-stop gradient syntax.
 */
const STRIPS = {
  20: [
    "linear-gradient(180deg,#8B5A2B 0 1px,transparent 1px 4px,#E8A93A 4px 6px,transparent 6px 10px,#6B4226 10px 13px,transparent 13px 15px,#F5C242 15px 16px,transparent 16px 19px,#8B5A2B 19px 20px)",
    "repeating-linear-gradient(90deg,#241A10 0 3px,transparent 3px 9px)",
  ].join(","),
  12: [
    "linear-gradient(180deg,#8B5A2B 0 1px,transparent 1px 4px,#E8A93A 4px 5px,transparent 5px 8px,#F5C242 8px 9px,transparent 9px 12px)",
    "repeating-linear-gradient(90deg,#241A10 0 3px,transparent 3px 9px)",
  ].join(","),
};

export default function FilmStrip({ size = 20, ...rest }) {
  return (
    <Box
      aria-hidden="true"
      h={`${size}px`}
      css={{ backgroundImage: STRIPS[size] ?? STRIPS[20] }}
      {...rest}
    />
  );
}
