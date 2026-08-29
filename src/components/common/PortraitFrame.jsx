import Image from "next/image";
import { Box } from "@chakra-ui/react";

/*
 * Bordered image frame with a fixed aspect ratio.
 *
 * Several photographs in the design live only in the Claude Design project and
 * are not in Sanity yet, so `src` is optional: without it the frame renders as
 * an empty panel rather than a broken image.
 */
export default function PortraitFrame({
  src,
  alt = "",
  ratio = "4/5",
  objectPosition = "50% 50%",
  sizes = "(max-width: 768px) 100vw, 400px",
  // Opt-in, and deliberately not the default: preloading is only a win for a
  // frame that is above the fold, and only one or two images per page should
  // claim it. Set it where the frame is the page's largest visible element.
  priority = false,
  ...rest
}) {
  return (
    <Box
      position="relative"
      overflow="hidden"
      bg="surface"
      border="1px solid"
      borderColor="rgba(139,90,43,0.5)"
      css={{ aspectRatio: ratio }}
      {...rest}
    >
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          style={{ objectFit: "cover", objectPosition }}
        />
      )}
    </Box>
  );
}
