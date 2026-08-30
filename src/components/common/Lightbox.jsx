import { useCallback, useEffect } from "react";
import { Box, Dialog, Flex, Link, Portal } from "@chakra-ui/react";

/*
 * Full-screen photo viewer shared by /press and /gallery.
 *
 * Built on Chakra's Dialog (Ark UI) so focus trapping, scroll locking and the
 * Escape key come for free; the left/right arrow stepping is added on top.
 * `items` are objects of { src, full, caption, slot }, optionally with a
 * `download` URL for hosts that must set Content-Disposition themselves.
 */

const navButton = {
  fontFamily: "body",
  fontSize: "xs",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  fontWeight: "600",
  // Tighter on phones: every pixel the controls give up goes to the photo.
  px: { base: "3", md: "5" },
  py: { base: "2.5", md: "3" },
  minH: { base: "11", md: "12" },
  flex: "0 0 auto",
  cursor: "pointer",
  borderRadius: "2px",
  border: "1px solid",
  borderColor: "rgba(139,90,43,0.7)",
  bg: "transparent",
  color: "cream",
};

export default function Lightbox({ items = [], index, onIndexChange, onClose, showDownload = false }) {
  const open = index !== null && index >= 0 && index < items.length;
  const item = open ? items[index] : null;

  const step = useCallback(
    (delta) => {
      if (!items.length || index === null) return;
      onIndexChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndexChange]
  );

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => {
        if (!e.open) onClose();
      }}
      size="cover"
    >
      <Portal>
        <Dialog.Backdrop bg="rgba(20,14,8,0.94)" />
        {/*
          size="cover" puts padding:10 (40px) on the positioner, which on a
          360px phone cost 80px of width before the content's own padding was
          even counted. Both are cut right back at base so the photo gets it.
        */}
        <Dialog.Positioner p={{ base: "2", md: "10" }}>
          <Dialog.Content
            bg="transparent"
            boxShadow="none"
            maxW="min(68.75rem,100%)"
            h="100%"
            p={{ base: "2", md: "clamp(1rem,4vw,3.5rem)" }}
            display="flex"
            flexDirection="column"
            gap={{ base: "3", md: "5" }}
          >
            {item && (
              <>
                <Dialog.Title srOnly>{item.caption}</Dialog.Title>
                {/*
                  `flex: 1 1 auto` + `minH: 0` is the fix for the photo shrinking
                  on small screens: as a default flex item this area was being
                  squeezed below its aspect ratio by the caption and buttons
                  below it, and background-size:contain then letterboxed the
                  photo inside the collapsed box. Now it claims the leftover
                  height and the chrome is pinned to its own size instead.
                */}
                <Flex flex="1 1 auto" minH="0" align="center" justify="center">
                  {item.youtubeId ? (
                    /*
                     * Videos play in place rather than opening YouTube. autoplay
                     * is set because the viewer already clicked the tile to get
                     * here — a second click to start would be a wasted step.
                     */
                    <Box
                      w="100%"
                      maxH="100%"
                      border="1px solid"
                      borderColor="rgba(139,90,43,0.5)"
                      bgColor="shadow"
                      css={{ aspectRatio: "16 / 9" }}
                    >
                      <Box
                        as="iframe"
                        w="100%"
                        h="100%"
                        display="block"
                        border="0"
                        title={item.caption || "Video"}
                        src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?autoplay=1&rel=0`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </Box>
                  ) : (
                    /*
                     * A real <img> rather than a background: it grows to the
                     * largest size that fits both constraints on its own, keeps
                     * its ratio, and lets the border hug the photo instead of
                     * framing empty space.
                     */
                    <Box
                      as="img"
                      src={item.src}
                      alt={item.alt || item.caption || ""}
                      display="block"
                      maxW="100%"
                      maxH="100%"
                      border="1px solid"
                      borderColor="rgba(139,90,43,0.5)"
                      bgColor="surface"
                      css={{ objectFit: "contain" }}
                    />
                  )}
                </Flex>

                <Flex
                  flex="0 0 auto"
                  justify="space-between"
                  align={{ base: "flex-start", md: "baseline" }}
                  gap={{ base: "3", md: "6" }}
                  wrap="wrap"
                >
                  <Box minW="0">
                    <Box
                      fontFamily="mono"
                      textStyle="microLabel"
                      letterSpacing="0.1em"
                      color="amber"
                    >
                      {item.slot || `${index + 1} / ${items.length}`}
                    </Box>
                    <Box
                      textStyle={{ base: "meta", md: "cardTitle" }}
                      mt="1.5"
                      color="cream"
                    >
                      {item.caption}
                    </Box>
                  </Box>

                  <Flex wrap="wrap" gap="2" flex="0 0 auto">
                    {showDownload && item.full && (
                      <Link
                        /*
                         * `item.download` is a URL the host already serves with
                         * Content-Disposition: attachment — needed for
                         * cross-origin files, where the `download` attribute
                         * below is ignored and the browser just navigates.
                         * Same-origin sets (the gallery) have no such URL and
                         * rely on the attribute alone.
                         */
                        href={item.download || item.full}
                        download
                        {...navButton}
                        bg="amber"
                        color="ink"
                        borderColor="amber"
                        display="inline-flex"
                        alignItems="center"
                        _hover={{ bg: "amberBright", color: "ink" }}
                      >
                        ↓ Download
                      </Link>
                    )}
                    <Box as="button" type="button" onClick={() => step(-1)} {...navButton}>
                      ← Prev
                    </Box>
                    <Box as="button" type="button" onClick={() => step(1)} {...navButton}>
                      Next →
                    </Box>
                    <Dialog.CloseTrigger asChild>
                      <Box
                        as="button"
                        type="button"
                        {...navButton}
                        bg="amber"
                        color="ink"
                        borderColor="amber"
                      >
                        Close
                      </Box>
                    </Dialog.CloseTrigger>
                  </Flex>
                </Flex>
              </>
            )}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
