import Image from "next/image";
import Styles from "../../styles/image.module.css";

const CustomImage = ({ width, maxWidth, ...rest }) => {
	let widths = {};
	width ? (widths["width"] = width) : "100%";
	maxWidth ? (widths["maxWidth"] = maxWidth) : "100%";
	//////////////////////////////////////////////////////////////////
	/*  shimmer from Next js to add blur loading to image
	 * check out: https://github.com/vercel/next.js/blob/canary/examples/image-component/pages/shimmer.js
	 */
	const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

	const toBase64 = (str) =>
		typeof window === "undefined"
			? Buffer.from(str).toString("base64")
			: window.btoa(str);
	//////////////////////////////////////////////////////////////////////////
	return (
		<div className={Styles.imageContainer} style={widths}>
			<Image
				className={Styles.image}
				placeholder="blur"
				blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
				{...rest}
				alt="this the custom image "
			/>
		</div>
	);
};

export default CustomImage;
