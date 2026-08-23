import NextLink from "next/link";
import Image from "next/image";
import { Box, Flex, Grid, Heading, Link, Text } from "@chakra-ui/react";
import { withSiteLayout } from "@/components/layout/SiteLayout";
import Eyebrow from "@/components/common/Eyebrow";
import FilmStrip from "@/components/common/FilmStrip";
import MetaItem from "@/components/common/MetaItem";
import SpotifyEmbed from "@/components/home/SpotifyEmbed";
import { cmsFetch } from "@/lib/cms";
import { coverUrl, DISCOGRAPHY, mergeWithSpotify } from "@/lib/albums";
import { getAlbumTracks, getArtistAlbums } from "@/lib/spotify";
import { SPOTIFY_ARTIST_ID } from "@/data/site";

export default function AlbumPage({ album, tracks, others, description }) {
  if (!album) {
    return (
      <Box maxW="shell" mx="auto" py="clamp(80px,14vw,180px)" px="gutter">
        <Heading fontFamily="display" fontSize="clamp(32px,4vw,56px)" fontWeight="500" color="cream">
          Album not found
        </Heading>
        <Link asChild mt="24px" display="inline-block" fontSize="14px" letterSpacing="0.12em" textTransform="uppercase">
          <NextLink href="/#albums">Back to the discography →</NextLink>
        </Link>
      </Box>
    );
  }

  const cover = album.remoteCover || coverUrl(album, 1100, 85);

  return (
    <>
      <Box as="section" maxW="shell" mx="auto" pt="clamp(28px,4vw,44px)" px="gutter">
        {/* Breadcrumb */}
        <Flex
          align="center"
          gap="12px"
          fontSize="12px"
          letterSpacing="0.18em"
          textTransform="uppercase"
          color="rgba(247,239,221,0.45)"
        >
          <Link asChild color="rgba(247,239,221,0.6)" _hover={{ color: "amberBright" }}>
            <NextLink href="/#albums">Albums</NextLink>
          </Link>
          <Box as="span">/</Box>
          <Box as="span" color="amber">
            {album.title}
          </Box>
        </Flex>

        <Grid
          mt="56px"
          templateColumns="repeat(auto-fit,minmax(320px,1fr))"
          gap="clamp(32px,4vw,64px)"
          alignItems="end"
        >
          <Box position="relative" border="1px solid" borderColor="rgba(139,90,43,0.6)" bg="surface" css={{ aspectRatio: "1" }}>
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
            <Eyebrow tone="amber" mb="24px">
              Album — full length
            </Eyebrow>
            <Heading
              as="h1"
              fontFamily="display"
              fontWeight="600"
              fontSize="clamp(46px,7.4vw,116px)"
              lineHeight="0.86"
              letterSpacing="-0.02em"
              m="0"
              color="cream"
              css={{ textWrap: "balance" }}
            >
              {album.title}
            </Heading>

            {description && (
              <Text
                maxW="48ch"
                mt="30px"
                fontSize="17px"
                lineHeight="1.7"
                color="rgba(247,239,221,0.76)"
                css={{ textWrap: "pretty" }}
              >
                {description}
              </Text>
            )}

            {album.spotifyAlbumId && (
              <Flex wrap="wrap" gap="14px" mt="36px">
                <Link
                  href={`https://open.spotify.com/album/${album.spotifyAlbumId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  display="inline-flex"
                  alignItems="center"
                  bg="amber"
                  color="ink"
                  fontWeight="600"
                  fontSize="14px"
                  letterSpacing="0.08em"
                  textTransform="uppercase"
                  px="28px"
                  py="16px"
                  borderRadius="2px"
                  _hover={{ bg: "amberBright", color: "ink" }}
                >
                  Listen on Spotify
                </Link>
              </Flex>
            )}

            <Flex gap="44px" mt="44px" wrap="wrap">
              <MetaItem label="Released" value={album.year} />
              <MetaItem label="Genre" value="Desert blues" />
              <MetaItem label="Recorded" value="Sweden" />
            </Flex>
          </Box>
        </Grid>

        <FilmStrip mt="80px" />
      </Box>

      {/* Tracklist + player */}
      <Box as="section" id="player" maxW="shell" mx="auto" pt="clamp(52px,7vw,80px)" px="gutter">
        <Grid templateColumns="repeat(auto-fit,minmax(330px,1fr))" gap="clamp(32px,4vw,56px)" alignItems="start">
          <Box>
            <Eyebrow mb="22px">Tracklist</Eyebrow>
            {tracks.length > 0 ? (
              <Box borderTop="1px solid" borderColor="rgba(139,90,43,0.45)">
                {tracks.map((t) => (
                  <Grid
                    key={`${t.num}-${t.title}`}
                    templateColumns="36px minmax(0,1fr) auto"
                    gap="14px"
                    alignItems="baseline"
                    py="18px"
                    px="4px"
                    borderBottom="1px solid"
                    borderColor="rgba(139,90,43,0.3)"
                  >
                    <Box fontFamily="display" fontSize="15px" color="bronze">
                      {t.num}
                    </Box>
                    <Box fontFamily="display" fontSize="21px" fontWeight="500" color="cream">
                      {t.title}
                    </Box>
                    <Box fontFamily="mono" fontSize="13px" color="rgba(247,239,221,0.5)">
                      {t.time}
                    </Box>
                  </Grid>
                ))}
              </Box>
            ) : (
              <Text fontSize="16px" color="rgba(247,239,221,0.6)" maxW="42ch">
                The tracklist loads from Spotify. Play the record with the player
                alongside in the meantime.
              </Text>
            )}
          </Box>

          <Box position="sticky" top="96px">
            <SpotifyEmbed
              type="album"
              id={album.spotifyAlbumId}
              title={`${album.title} on Spotify`}
              height={520}
              bg="surface"
            />
          </Box>
        </Grid>
      </Box>

      {/* Other releases */}
      {others.length > 0 && (
        <Box as="section" maxW="shell" mx="auto" pt="88px">
          <Flex px="gutter" align="flex-end" justify="space-between" gap="32px" wrap="wrap">
            <Heading
              as="h2"
              fontFamily="display"
              fontSize="clamp(30px,3.4vw,46px)"
              lineHeight="1"
              fontWeight="500"
              m="0"
              color="cream"
            >
              More albums
            </Heading>
            <Link asChild fontSize="13px" letterSpacing="0.12em" textTransform="uppercase" fontWeight="600">
              <NextLink href="/#albums">All releases →</NextLink>
            </Link>
          </Flex>

          <Grid
            mt="36px"
            px="gutter"
            templateColumns="repeat(auto-fit,minmax(220px,1fr))"
            gap="24px"
          >
            {others.map((a) => {
              const src = a.remoteCover || coverUrl(a, 600);
              return (
                <Link key={a.slug} asChild color="cream" _hover={{ color: "amberBright" }}>
                  <NextLink href={`/album/${a.slug}`}>
                    <Box>
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
                            sizes="(max-width: 768px) 50vw, 220px"
                            style={{ objectFit: "cover" }}
                          />
                        )}
                      </Box>
                      <Flex align="baseline" gap="10px" mt="14px">
                        <Box as="span" fontFamily="display" fontSize="20px" fontWeight="500">
                          {a.title}
                        </Box>
                        <Box as="span" fontSize="13px" color="rgba(247,239,221,0.45)">
                          {a.year}
                        </Box>
                      </Flex>
                    </Box>
                  </NextLink>
                </Link>
              );
            })}
          </Grid>

          <Box px="gutter" mt="80px">
            <FilmStrip />
          </Box>
        </Box>
      )}
    </>
  );
}

AlbumPage.getLayout = withSiteLayout();

export async function getStaticPaths() {
  return {
    paths: DISCOGRAPHY.map((a) => ({ params: { slug: a.slug } })),
    // New releases discovered from Spotify render on first request.
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const albums = mergeWithSpotify(await getArtistAlbums(SPOTIFY_ARTIST_ID));
  const album = albums.find((a) => a.slug === params.slug) || null;

  if (!album) return { notFound: true, revalidate: 60 * 60 };

  const [tracks, sanityAlbum] = await Promise.all([
    getAlbumTracks(album.spotifyAlbumId),
    cmsFetch(
      `*[_type == "album" && albumSlug.current == $slug][0]{ albumDescription }`,
      { slug: params.slug },
      null
    ),
  ]);

  return {
    props: {
      album,
      tracks,
      description: sanityAlbum?.albumDescription || null,
      others: albums.filter((a) => a.slug !== album.slug).slice(0, 5),
    },
    revalidate: 60 * 60 * 24,
  };
}
