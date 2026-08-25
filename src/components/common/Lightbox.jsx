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
  fontSize: "12px",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  fontWeight: "600",
  px: "20px",
  py: "12px",
  minH: "46px",
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
            maxW="min(1100px,100%)"
            p="clamp(16px,4vw,56px)"
            display="flex"
            flexDirection="column"
            gap="20px"
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

                <Flex justify="space-between" align="baseline" gap="24px" wrap="wrap">
                  <Box>
                    <Box
                      fontFamily="mono"
                      fontSize="11px"
                      letterSpacing="0.1em"
                      textTransform="uppercase"
                      color="amber"
                    >
                      {item.slot || `${index + 1} / ${items.length}`}
                    </Box>
                    <Box fontFamily="display" fontSize="clamp(20px,2vw,26px)" mt="6px" color="cream">
                      {item.caption}
                    </Box>
                  </Box>

                  <Flex wrap="wrap" gap="10px">
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
