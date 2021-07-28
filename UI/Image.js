import Styles from "../styles/image.module.css";
import NextImage from "next/image";

const Image = ({ height, maxHeight, width, maxWidth, ...rest }) => {
	let widths = {};
	width ? (widths["width"] = width) : "100%";
	maxWidth ? (widths["maxWidth"] = maxWidth) : "100%";

	return (
		<div className={Styles.imageContainer} style={widths}>
			<NextImage className={Styles.image} {...rest} />
		</div>
	);
};

export default Image;
