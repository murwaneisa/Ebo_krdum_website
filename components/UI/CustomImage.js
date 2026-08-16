import Image from "next/image";

/*
 * Responsive image with unknown intrinsic dimensions (Sanity CDN URLs).
 * `width={0} height={0} sizes="100vw"` + `style` is the Next.js pattern that
 * replaces the old `layout="fill"` + CSS override hack.
 * See: https://nextjs.org/docs/pages/api-reference/components/image
 */
const CustomImage = ({
  src,
  alt,
  width,
  maxWidth,
  objectFit = "contain",
  sizes = "100vw",
  ...rest
}) => {
  const widths = {};
  if (width) widths.width = width;
  if (maxWidth) widths.maxWidth = maxWidth;

  return (
    <div style={widths}>
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes={sizes}
        style={{ width: "100%", height: "auto", objectFit }}
        {...rest}
      />
    </div>
  );
};

export default CustomImage;
