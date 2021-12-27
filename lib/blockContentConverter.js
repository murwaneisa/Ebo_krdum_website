import SanityBlockContent from "@sanity/block-content-to-react";
/* 
-convert the sanity block-content to text
checkout:https://github.com/sanity-io/block-content-to-react
 */

export const blockContentConverter = (text) => {
	return <SanityBlockContent blocks={text} />;
};
