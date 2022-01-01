import Image from "next/image";
import Styles from "../../styles/image.module.css";

const CustomImage = ({ src, alt, width, maxWidth, ...rest }) => {
  let widths = {};
  width ? (widths["width"] = width) : "100%";
  maxWidth ? (widths["maxWidth"] = maxWidth) : "100%";

  return (
    <div className={Styles.imageContainer} style={widths}>
      <Image
        src={src}
        alt={alt}
        className={Styles.image}
        placeholder="blur"
        blurDataURL={src}
        {...rest}
      />
    </div>
  );
};

export default CustomImage;
