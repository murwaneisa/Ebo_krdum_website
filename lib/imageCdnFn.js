export const imageCDN = (imageObj) => {
	const { _ref: ref } = imageObj.asset;
	const assetRefParts = ref.split("-"); // ["file", "ff7...", "m4a"]
	const id = assetRefParts[1]; // "ff7..."
	const size = assetRefParts[2]; // 1400 x 1400
	const format = assetRefParts[3]; // "jpg"
	const imageUrl = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}-${size}.${format}`;
	return imageUrl;
};
