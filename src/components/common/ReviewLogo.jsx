import { Box } from "@chakra-ui/react";

/*
 * An outlet's logo, rendered legibly on the dark page.
 *
 * The five logos in Sanity are not a consistent set: Sveriges Radio and SVT are
 * WHITE artwork, Svenska Dagbladet and Dagens Nyheter are BLACK, and LIRA has
 * no alpha channel at all. No single background works for all of them -- black
 * marks vanish on ink, white marks vanish on cream.
 *
 * So transparent logos are flattened to one colour with a filter:
 * `brightness(0)` forces every opaque pixel to black whatever it started as,
 * and `invert(1)` turns that to white, which is then tinted by opacity to sit
 * with the cream palette. Alpha is preserved, so the result is a clean
 * silhouette regardless of the source artwork.
 *
 * That trick would destroy an opaque logo -- the whole rectangle would go
 * white -- so those are rendered untouched on a light chip, which is what their
 * own background expects. `isOpaque` comes from Sanity's asset metadata, so
 * this branches on data rather than on a hardcoded list of outlets.
 */
export default function ReviewLogo({ logo, alt, height = 26, ...rest }) {
  if (!logo?.src) return null;

  const common = {
    src: logo.src,
    alt: alt ? `${alt} logo` : "",
    loading: "lazy",
    decoding: "async",
  };

  if (logo.isOpaque) {
    return (
      <Box
        display="inline-flex"
        alignItems="center"
        bgColor="cream"
        px="2"
        py="1.5"
        borderRadius="2px"
        {...rest}
      >
        <Box
          as="img"
          {...common}
          css={{
            display: "block",
            height: `${height}px`,
            width: "auto",
            maxWidth: "9.375rem",
            objectFit: "contain",
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      as="img"
      {...common}
      css={{
        display: "block",
        height: `${height}px`,
        width: "auto",
        maxWidth: "10rem",
        objectFit: "contain",
        objectPosition: "left center",
        filter: "brightness(0) invert(1)",
        opacity: 0.86,
      }}
      {...rest}
    />
  );
}
