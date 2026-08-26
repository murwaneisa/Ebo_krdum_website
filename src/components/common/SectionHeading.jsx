import { Heading } from "@chakra-ui/react";

const TEXT_STYLE = { lg: "sectionLg", md: "section", sm: "sectionSm" };

export default function SectionHeading({ children, size = "md", ...rest }) {
  return (
    <Heading
      as="h2"
      textStyle={TEXT_STYLE[size] ?? TEXT_STYLE.md}
      m="0"
      color="cream"
      css={{ textWrap: "balance" }}
      {...rest}
    >
      {children}
    </Heading>
  );
}
