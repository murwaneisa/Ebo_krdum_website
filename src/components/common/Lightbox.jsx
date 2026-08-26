import { useCallback, useEffect } from "react";
import { Box, Dialog, Flex, Link, Portal } from "@chakra-ui/react";

/*
 * Full-screen photo viewer shared by /press and /gallery.
 *
 * Built on Chakra's Dialog (Ark UI) so focus trapping, scroll locking and the
 * Escape key come for free; the left/right arrow stepping is added on top.
 * `items` are objects of { src, full, caption, slot }.
 */

const navButton = {
  fontFamily: "body",
  fontSize: "xs",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  fontWeight: "600",
  px: "5",
  py: "3",
  minH: "12",
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
        <Dialog.Positioner>
          <Dialog.Content
            bg="transparent"
            boxShadow="none"
            maxW="min(68.75rem,100%)"
            p="clamp(1rem,4vw,3.5rem)"
            display="flex"
            flexDirection="column"
            gap="5"
          >
            {item && (
              <>
                <Dialog.Title srOnly>{item.caption}</Dialog.Title>
                <Box
                  role="img"
                  aria-label={item.caption}
                  w="100%"
                  maxH="72vh"
                  mx="auto"
                  border="1px solid"
                  borderColor="rgba(139,90,43,0.5)"
                  bgColor="surface"
                  css={{
                    aspectRatio: String(item.ratio || 1),
                    backgroundImage: item.src ? `url(${item.src})` : undefined,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                />

                <Flex justify="space-between" align="baseline" gap="6" wrap="wrap">
                  <Box>
                    <Box
                      fontFamily="mono"
                      textStyle="microLabel"
                      letterSpacing="0.1em"
                      color="amber"
                    >
                      {item.slot || `${index + 1} / ${items.length}`}
                    </Box>
                    <Box textStyle="cardTitle" mt="1.5" color="cream">
                      {item.caption}
                    </Box>
                  </Box>

                  <Flex wrap="wrap" gap="2.5">
                    {showDownload && item.full && (
                      <Link
                        href={item.full}
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
