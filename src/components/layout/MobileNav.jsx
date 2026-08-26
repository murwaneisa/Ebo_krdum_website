import { useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Box, Drawer, Flex, Link, Portal } from "@chakra-ui/react";
import { CONTACT, NAV, SOCIALS } from "@/data/site";
import { SocialIconLink } from "../common/SocialIcons";

/*
 * Hamburger + full-screen menu, shown below `lg` where the six nav links plus
 * the Listen button no longer fit on one line.
 *
 * Built on Chakra's Drawer (Ark UI) so the focus trap, scroll lock, Escape key
 * and aria-expanded wiring come for free — the same reason Lightbox is built on
 * Dialog rather than a hand-rolled overlay.
 */

function BarsIcon() {
  return (
    <Box
      as="svg"
      viewBox="0 0 20 14"
      w="20px"
      h="14px"
      aria-hidden="true"
      fill="currentColor"
    >
      <rect x="0" y="0" width="20" height="2" />
      <rect x="0" y="6" width="20" height="2" />
      <rect x="0" y="12" width="20" height="2" />
    </Box>
  );
}

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useRouter();

  return (
    <Drawer.Root
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      placement="top"
      size="full"
    >
      <Drawer.Trigger asChild>
        <Box
          as="button"
          type="button"
          aria-label="Open menu"
          display={{ base: "inline-flex", lg: "none" }}
          alignItems="center"
          justifyContent="center"
          w="12"
          minH="12"
          border="1px solid"
          borderColor="rgba(139,90,43,0.6)"
          borderRadius="2px"
          bg="transparent"
          color="cream"
          cursor="pointer"
          transition="border-color 0.15s ease, color 0.15s ease"
          _hover={{ borderColor: "amber", color: "amberBright" }}
        >
          <BarsIcon />
        </Box>
      </Drawer.Trigger>

      <Portal>
        <Drawer.Backdrop bg="rgba(20,14,8,0.88)" />
        <Drawer.Positioner>
          <Drawer.Content
            bg="ink"
            borderBottom="1px solid"
            borderColor="rgba(139,90,43,0.45)"
          >
            <Drawer.Title srOnly>Site menu</Drawer.Title>

            {/*
              Drawer.Content is a fixed 100dvh, so this column must scroll:
              without it a short viewport silently clips the contact block and
              the social icons off the bottom instead of letting you reach them.
            */}
            <Flex
              direction="column"
              h="100%"
              w="100%"
              maxW="shell"
              mx="auto"
              px="gutter"
              py="4"
              overflowY="auto"
            >
              <Flex
                align="center"
                justify="space-between"
                minH="16"
                flex="0 0 auto"
              >
                <Box textStyle="microLabel" color="bronze">
                  Menu
                </Box>
                <Drawer.CloseTrigger asChild>
                  <Box
                    as="button"
                    type="button"
                    aria-label="Close menu"
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    w="12"
                    minH="12"
                    border="1px solid"
                    borderColor="rgba(139,90,43,0.6)"
                    borderRadius="2px"
                    bg="transparent"
                    color="cream"
                    fontSize="lg"
                    cursor="pointer"
                    transition="border-color 0.15s ease, color 0.15s ease"
                    _hover={{ borderColor: "amber", color: "amberBright" }}
                  >
                    ✕
                  </Box>
                </Drawer.CloseTrigger>
              </Flex>

              {/*
                Links sit just under the Menu row rather than centred: the nav
                still absorbs the leftover height (so the contact block stays
                pinned to the bottom), but aligns its content to the top.
              */}
              <Flex
                as="nav"
                direction="column"
                flex="1 1 auto"
                justify="flex-start"
                pt="2"
                pb="6"
              >
                {NAV.map((item, i) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      asChild
                      data-nav-item=""
                      color={active ? "cream" : "rgba(247,239,221,0.68)"}
                      _hover={{ color: "amberBright" }}
                      css={{ animationDelay: `${i * 45}ms` }}
                    >
                      <NextLink href={item.href} onClick={() => setOpen(false)}>
                        {/*
                          py keeps each row at ~44px, the minimum comfortable
                          tap target, without the type having to carry it.
                        */}
                        <Flex align="baseline" gap="4" py="2.5">
                          <Box
                            as="span"
                            fontFamily="mono"
                            fontSize="xs"
                            color={active ? "amber" : "bronze"}
                            w="2rem"
                            flex="0 0 auto"
                          >
                            {String(i + 1).padStart(2, "0")}
                          </Box>
                          <Box as="span" textStyle="cardTitle" fontWeight="500">
                            {item.label}
                          </Box>
                        </Flex>
                      </NextLink>
                    </Link>
                  );
                })}
              </Flex>

              <Box
                flex="0 0 auto"
                borderTop="1px solid"
                borderColor="rgba(139,90,43,0.45)"
                pt="6"
              >
                <Box textStyle="microLabel" color="bronze">
                  Booking &amp; management
                </Box>
                <Link
                  href={`mailto:${CONTACT.booking}`}
                  textStyle="body"
                  display="block"
                  mt="2"
                  css={{ overflowWrap: "anywhere" }}
                >
                  {CONTACT.booking}
                </Link>
                <Flex mt="5" wrap="wrap" gap="2">
                  {SOCIALS.map((s) => (
                    <SocialIconLink key={s.label} {...s} box={44} />
                  ))}
                </Flex>
              </Box>
            </Flex>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
