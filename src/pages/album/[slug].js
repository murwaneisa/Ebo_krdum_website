import NextLink from "next/link";
import Image from "next/image";
import { Box, Flex, Grid, Heading, Link, Text } from "@chakra-ui/react";
import { withSiteLayout } from "@/components/layout/SiteLayout";
import Eyebrow from "@/components/common/Eyebrow";
import FilmStrip from "@/components/common/FilmStrip";
import MetaItem from "@/components/common/MetaItem";
import AlbumPlayer from "@/components/home/AlbumPlayer";
import Tracklist from "@/components/album/Tracklist";
import { buildDiscography, coverUrl, genreOf } from "@/lib/albums";
import { getAlbum, getAlbumTracks, getArtistAlbums } from "@/lib/deezer";
import { DEEZER_ARTIST_ID, SPOTIFY_ARTIST_ID } from "@/data/site";

export default function AlbumPage({ album, tracks, others }) {
  const isAlbum = album?.recordType === "album";
  if (!album) {
    return (
      <Box maxW="shell" mx="auto" py="clamp(5rem,14vw,11.25rem)" px="gutter">
        <Heading textStyle="section" color="cream">
          Album not found
        </Heading>
        <Link
          asChild
          mt="6"
          display="inline-block"
          textStyle="eyebrow"
          letterSpacing="0.12em"
        >
          <NextLink href="/#albums">Back to the discography →</NextLink>
        </Link>
      </Box>
    );
  }

  const cover = coverUrl(album, 1100);

  return (
    <>
      <Box
        as="section"
        maxW="shell"
        mx="auto"
        pt="clamp(1.75rem,4vw,2.75rem)"
        px="gutter"
      >
        {/* Breadcrumb */}
        <Flex
          align="center"
          gap="3"
          textStyle="eyebrow"
          letterSpacing="0.18em"
          color="rgba(247,239,221,0.45)"
        >
          <Link
            asChild
            color="rgba(247,239,221,0.6)"
            _hover={{ color: "amberBright" }}
          >
            <NextLink href="/#albums">Albums</NextLink>
          </Link>
          <Box as="span">/</Box>
          <Box as="span" color="amber">
            {album.title}
          </Box>
        </Flex>

        <Grid
          mt="14"
          templateColumns="repeat(auto-fit,minmax(20rem,1fr))"
          gap="clamp(2rem,4vw,4rem)"
          alignItems="end"
        >
          <Box
            position="relative"
            border="1px solid"
            borderColor="rgba(139,90,43,0.6)"
            bg="surface"
            css={{ aspectRatio: "1" }}
          >
            {cover && (
              <Image
                src={cover}
                alt={`${album.title} album cover`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 45vw"
                style={{ objectFit: "cover" }}
              />
            )}
          </Box>

          <Box>
            <Eyebrow tone="amber" mb="6">
              {isAlbum
                ? "Album — full length"
                : album.recordType === "ep"
                  ? "EP"
                  : "Single"}
            </Eyebrow>
            <Heading
              as="h1"
              textStyle="pageTitle"
              lineHeight="0.86"
              m="0"
              color="cream"
              css={{ textWrap: "balance" }}
            >
              {album.title}
            </Heading>

            <Flex wrap="wrap" gap="3.5" mt="9">
              <Link
                /*
                 * Only releases listed in SPOTIFY_ALBUM_IDS have a direct link.
                 * Everything else — including anything released from now on —
                 * goes to the artist profile rather than a search results page,
                 * which was landing people on a list instead of the music.
                 */
                href={
                  album.spotifyAlbumId
                    ? `https://open.spotify.com/album/${album.spotifyAlbumId}`
                    : `https://open.spotify.com/artist/${SPOTIFY_ARTIST_ID}`
                }
                target="_blank"
                rel="noopener noreferrer"
                display="inline-flex"
                alignItems="center"
                bg="amber"
                color="ink"
                fontWeight="600"
                textStyle="eyebrow"
                letterSpacing="0.08em"
                px="7"
                py="4"
                borderRadius="2px"
                _hover={{ bg: "amberBright", color: "ink" }}
              >
                Listen on Spotify
              </Link>
              {album.deezerAlbumId && (
                <Link
                  href={`https://www.deezer.com/album/${album.deezerAlbumId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  display="inline-flex"
                  alignItems="center"
                  color="amber"
                  border="1px solid"
                  borderColor="rgba(232,169,58,0.6)"
                  fontWeight="600"
                  textStyle="eyebrow"
                  letterSpacing="0.08em"
                  px="7"
                  py="4"
                  borderRadius="2px"
                  _hover={{ bg: "amber", color: "ink" }}
                >
                  Listen on Deezer
                </Link>
              )}
            </Flex>

            <Flex gap="11" mt="11" wrap="wrap">
              <MetaItem label="Released" value={album.year} />
              <MetaItem label="Genre" value={album.genre || "Desert blues"} />
              {album.trackCount ? (
                <MetaItem
                  label={album.trackCount === 1 ? "Track" : "Tracks"}
                  value={String(album.trackCount)}
                />
              ) : null}
            </Flex>
          </Box>
        </Grid>

        <FilmStrip mt="20" />
      </Box>

      {/* Tracklist + player */}
      <Box
        as="section"
        id="player"
        maxW="shell"
        mx="auto"
        pt="clamp(3.25rem,7vw,5rem)"
        px="gutter"
      >
        <Grid
          templateColumns="repeat(auto-fit,minmax(20.625rem,1fr))"
          gap="clamp(2rem,4vw,3.5rem)"
          alignItems="start"
        >
          <Box>
            <Eyebrow mb="6">Tracklist</Eyebrow>
            <Tracklist tracks={tracks} deezerAlbumId={album.deezerAlbumId} />
          </Box>

          <Box position="sticky" top="24">
            <AlbumPlayer
              deezerAlbumId={album.deezerAlbumId}
              title={album.title}
              height={520}
              bg="surface"
            />
          </Box>
        </Grid>
      </Box>

      {/* Other releases */}
      {others.length > 0 && (
        <Box as="section" maxW="shell" mx="auto" pt="24">
          <Flex
            px="gutter"
            align="flex-end"
            justify="space-between"
            gap="8"
            wrap="wrap"
          >
            <Heading
              as="h2"
              textStyle="sectionSm"
              m="0"
              color="cream"
            >
              More albums
            </Heading>
            <Link
              asChild
              textStyle="eyebrow"
              letterSpacing="0.12em"
              fontWeight="600"
            >
              <NextLink href="/#albums">All releases →</NextLink>
            </Link>
          </Flex>

          <Grid
            mt="9"
            px="gutter"
            /*
             * `auto-fill`, not `auto-fit`: auto-fit collapses the empty tracks,
             * so a release with only two others to show would stretch those two
             * across the whole row. auto-fill keeps the tracks, so a cover is
             * the same size whatever the album count.
             *
             * Two fixed columns below `md`, where one auto track would fill the
             * screen width with a single cover.
             */
            templateColumns={{
              base: "repeat(2,1fr)",
              md: "repeat(auto-fill,minmax(13.75rem,1fr))",
            }}
            gap="6"
          >
            {others.map((a) => {
              const src = coverUrl(a, 600);
              return (
                <Link
                  key={a.slug}
                  asChild
                  color="cream"
                  /*
                   * Chakra's Link centres its flex items. A two-line album
                   * title makes that row taller, which would push the shorter
                   * neighbours' covers down; anchoring to the start keeps every
                   * cover on the same line.
                   */
                  alignItems="flex-start"
                  _hover={{ color: "amberBright" }}
                >
                  <NextLink href={`/album/${a.slug}`}>
                    {/*
                      * Chakra's Link renders the anchor as a flex container, so
                      * this box is a flex item and would otherwise size to its
                      * own content — making each cover as wide as its album
                      * title. `w="100%"` fills the grid cell instead, so every
                      * cover is the same square.
                      */}
                    <Box w="100%" minW="0">
                      <Box
                        position="relative"
                        border="1px solid"
                        borderColor="rgba(139,90,43,0.45)"
                        overflow="hidden"
                        bg="surface"
                        css={{ aspectRatio: "1" }}
                      >
                        {src && (
                          <Image
                            src={src}
                            alt={`${a.title} album cover`}
                            fill
                            sizes="(max-width: 768px) 50vw, 260px"
                            style={{ objectFit: "cover" }}
                          />
                        )}
                      </Box>
                      <Flex align="baseline" wrap="wrap" gap="0.25rem 0.625rem" mt="3.5">
                        <Box
                          as="span"
                          fontFamily="display"
                          fontSize="xl"
                          fontWeight="500"
                        >
                          {a.title}
                        </Box>
                        <Box
                          as="span"
                          fontSize="sm"
                          color="rgba(247,239,221,0.45)"
                        >
                          {a.year}
                        </Box>
                      </Flex>
                    </Box>
                  </NextLink>
                </Link>
              );
            })}
          </Grid>

          <Box px="gutter" mt="20">
            <FilmStrip />
          </Box>
        </Box>
      )}
    </>
  );
}

AlbumPage.getLayout = withSiteLayout();

export async function getStaticPaths() {
  // Prerender whatever Deezer knows about at build time. Anything released
  // afterwards is rendered on first request by the blocking fallback below, so
  // a new album reaches the site without a deploy or a CMS entry.
  const albums = buildDiscography(await getArtistAlbums(DEEZER_ARTIST_ID));

  return {
    paths: albums.map((a) => ({ params: { slug: a.slug } })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const albums = buildDiscography(await getArtistAlbums(DEEZER_ARTIST_ID));
  const album = albums.find((a) => a.slug === params.slug) || null;

  if (!album) return { notFound: true, revalidate: 1 };

  // Detail and tracklist both come from Deezer, and each fails soft on its own,
  // so the page renders even if both do.
  const [detail, tracks] = await Promise.all([
    getAlbum(album.deezerAlbumId),
    getAlbumTracks(album.deezerAlbumId),
  ]);

  return {
    props: {
      album: {
        ...album,
        trackCount:
          detail?.nb_tracks ?? album.trackCount ?? tracks.length ?? null,
        genre: genreOf(detail),
      },
      tracks,
      others: albums.filter((a) => a.slug !== album.slug).slice(0, 5),
    },
    revalidate: 1,
  };
}
