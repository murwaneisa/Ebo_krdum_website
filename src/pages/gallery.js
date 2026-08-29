import { useMemo, useState } from "react";
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { withSiteLayout } from "@/components/layout/SiteLayout";
import FilmStrip from "@/components/common/FilmStrip";
import Lightbox from "@/components/common/Lightbox";
import { CONTACT } from "@/data/site";
import { GALLERY_CATEGORIES, GALLERY_PHOTOS } from "@/data/photos";
import { cmsFetch, imageMeta, youtubeId } from "@/lib/cms";

function FilterButton({ active, children, onClick }) {
  return (
    <Box
      as="button"
      type="button"
      onClick={onClick}
      aria-pressed={active}
      fontFamily="body"
      textStyle="microLabel"
      letterSpacing="0.14em"
      fontWeight="600"
      px="6"
      py="3"
      cursor="pointer"
      borderRadius="2px"
      border="1px solid"
      borderColor={active ? "amber" : "rgba(139,90,43,0.6)"}
      bg={active ? "amber" : "transparent"}
      color={active ? "ink" : "rgba(247,239,221,0.72)"}
    >
      {children}
    </Box>
  );
}

export default function Gallery({ photos = [], videos = [] }) {
  const [cat, setCat] = useState("All");
  const [active, setActive] = useState(null);

  const isVideo = cat === "Video";

  // The lightbox steps through the *filtered* set, so Next/Prev never jumps to a
  // photo that is hidden behind the current filter.
  const visible = useMemo(
    () =>
      isVideo ? videos : photos.filter((p) => cat === "All" || p.cat === cat),
    [cat, isVideo, photos, videos],
  );

  const selectCat = (key) => {
    setCat(key);
    setActive(null);
  };

  return (
    <>
      <Box
        as="section"
        maxW="shell"
        mx="auto"
        pt="clamp(3.25rem,7vw,5.5rem)"
        px="gutter"
      >
        <Flex wrap="wrap" align="flex-end" gap="1.75rem clamp(1.5rem,3vw,3rem)">
          <Heading
            as="h1"
            flex="1 1 23.75rem"
            minW="0"
            textStyle="pageTitle"
            m="0"
            color="cream"
          >
            On stage,
            <br />
            <Box as="span" fontStyle="italic" color="amberBright">
              off stage
            </Box>
          </Heading>
          <Text
            flex="1 1 16.25rem"
            minW="0"
            maxW="44ch"
            mb="3"
            textStyle="body"
            lineHeight="1.7"
            color="rgba(247,239,221,0.68)"
          >
            Live performances, portraits and the quiet hours between soundcheck
            and the first song.
          </Text>
        </Flex>

        <Flex wrap="wrap" gap="2.5" mt="14">
          {GALLERY_CATEGORIES.map((c) => (
            <FilterButton
              key={c.key}
              active={cat === c.key}
              onClick={() => selectCat(c.key)}
            >
              {c.label}
            </FilterButton>
          ))}
        </Flex>

        <FilmStrip mt="11" />
      </Box>

      <Box
        as="section"
        id="gallery"
        maxW="shell"
        mx="auto"
        pt="clamp(2.25rem,5vw,3.5rem)"
        px="gutter"
        pb="10"
      >
        <Box
          css={{
            columns: "3 16.25rem",
            columnGap: "clamp(0.875rem,2vw,1.5rem)",
          }}
        >
          {visible.map((p, i) => (
            <Box key={p.id} mb="6" css={{ breakInside: "avoid" }}>
              <Box
                as="button"
                type="button"
                onClick={() => setActive(i)}
                position="relative"
                display="block"
                w="100%"
                p="0"
                cursor="pointer"
                overflow="hidden"
                textAlign="left"
                border="1px solid"
                borderColor="rgba(139,90,43,0.45)"
                bg="ink"
              >
                <Box
                  role="img"
                  aria-label={p.alt || p.caption}
                  display="block"
                  w="100%"
                  bgColor="surface2"
                  css={{
                    aspectRatio: String(p.ratio),
                    backgroundImage: `url(${p.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                {/* Play badge marks a tile as a video without changing its shape. */}
                {p.kind === "video" && (
                  <Flex
                    position="absolute"
                    inset="0"
                    align="center"
                    justify="center"
                    pointerEvents="none"
                  >
                    <Flex
                      align="center"
                      justify="center"
                      w="14"
                      h="14"
                      borderRadius="full"
                      bg="rgba(36,26,16,0.72)"
                      border="1px solid"
                      borderColor="amber"
                      color="amber"
                    >
                      <Box
                        as="svg"
                        viewBox="0 0 24 24"
                        w="20px"
                        h="20px"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M8 5v14l11-7z" />
                      </Box>
                    </Flex>
                  </Flex>
                )}
                <Box
                  position="absolute"
                  inset="0"
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-end"
                  p="6"
                  css={{
                    background:
                      "linear-gradient(0deg,rgba(36,26,16,0.9),rgba(36,26,16,0) 62%)",
                  }}
                >
                  <Box
                    fontFamily="mono"
                    textStyle="microLabel"
                    letterSpacing="0.1em"
                    color="amber"
                  >
                    {p.slot}
                  </Box>
                  <Box
                    fontFamily="display"
                    textStyle="cardTitle"
                    mt="1.5"
                    color="cream"
                  >
                    {p.caption}
                  </Box>
                </Box>
                <Box
                  position="absolute"
                  top="4"
                  right="4"
                  fontFamily="mono"
                  fontSize="2xs"
                  color="rgba(247,239,221,0.55)"
                >
                  {String(i + 1).padStart(2, "0")}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {visible.length === 0 && (
          <Text textStyle="body" color="rgba(247,239,221,0.6)">
            {isVideo ? "No videos yet." : "No photos in this category yet."}
          </Text>
        )}
      </Box>

      <Box
        as="section"
        maxW="shell"
        mx="auto"
        px="gutter"
        pb="clamp(3.5rem,8vw,6rem)"
      >
        <FilmStrip />
      </Box>

      <Lightbox
        items={visible.map((p) => ({ ...p, src: p.full || p.src }))}
        index={active}
        onIndexChange={setActive}
        onClose={() => setActive(null)}
      />
    </>
  );
}

Gallery.getLayout = withSiteLayout({
  title: "Gallery",
  description:
    "Live performances, portraits and behind the scenes with Ebo Krdum.",
});

const GALLERY_QUERY = `*[_type == "gallery"] | order(order asc, _createdAt desc){
  _id,
  photoGalleryTitle,
  photoGalleryImages[]{ _key, itemImage, photoCategory, photoCaption, photoTakenBy },
  galleryVideos[]{ _key, videoUrl, videoTitle, videoCredit, videoPoster }
}`;

export async function getStaticProps() {
  const sets = await cmsFetch(GALLERY_QUERY, {}, null);

  // No CMS reachable (or nothing published yet): fall back to the bundled set
  // so the page still renders rather than showing an empty grid.
  if (!sets?.length) {
    return {
      props: { photos: GALLERY_PHOTOS, videos: [] },
      revalidate: 60 * 60,
    };
  }

  const photos = [];
  const videos = [];

  for (const set of sets) {
    for (const item of set.photoGalleryImages || []) {
      // A photo with no usable asset ref would render as an empty frame, so it
      // is dropped rather than left as a hole in the grid.
      const meta = imageMeta(item.itemImage, 1200);
      if (!meta) continue;
      // Photos added before the category field existed have none; defaulting
      // keeps them in the grid instead of stranding them outside every tab.
      const cat = item.photoCategory || "Live";
      const full = imageMeta(item.itemImage, 2000);
      photos.push({
        id: `${set._id}-${item._key}`,
        kind: "photo",
        cat,
        ratio: meta.ratio,
        src: meta.url,
        full: full?.url || meta.url,
        // There is no dedicated alt field, so the caption carries the
        // accessible name, falling back to the set title.
        alt: item.photoCaption || set.photoGalleryTitle || "",
        caption: item.photoCaption || "",
        // `slot` is the small amber label over the tile — the photographer when
        // known, otherwise the set it came from.
        slot: item.photoTakenBy
          ? `${cat.toLowerCase()} — ${item.photoTakenBy}`
          : set.photoGalleryTitle || cat.toLowerCase(),
      });
    }

    for (const item of set.galleryVideos || []) {
      const id = youtubeId(item.videoUrl);
      if (!id) continue;
      const poster = imageMeta(item.videoPoster, 1200);
      videos.push({
        id: `${set._id}-${item._key}`,
        kind: "video",
        cat: "Video",
        youtubeId: id,
        ratio: 16 / 9,
        src: poster?.url || `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
        alt: item.videoTitle || "",
        caption: item.videoTitle || "",
        slot: item.videoCredit || "video",
      });
    }
  }

  return { props: { photos, videos }, revalidate: 60 * 60 };
}
