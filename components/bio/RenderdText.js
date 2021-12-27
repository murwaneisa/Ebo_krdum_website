import { Text } from "@chakra-ui/react";
import React from "react";
import CustomH4 from "../UI/CustomH4";
import TextSectionStack from "../UI/TextSectionStack";

const RenderedText = (props) => {
	return <TextSectionStack>{props.text}</TextSectionStack>;
};

export default RenderedText;
