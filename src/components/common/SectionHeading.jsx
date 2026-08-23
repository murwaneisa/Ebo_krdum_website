import { Heading } from "@chakra-ui/react";

export default function SectionHeading({ children, size = "md", ...rest }) {
  const fontSize =
    size === "lg"
      ? "clamp(38px,4.6vw,64px)"
      : size === "sm"
        ? "clamp(30px,3.4vw,46px)"
        : "clamp(34px,4vw,56px)";

  return (
    <Heading
      as="h2"
      fontFamily="display"
      fontSize={fontSize}
      lineHeight="1"
      fontWeight="500"
      m="0"
      color="cream"
      css={{ textWrap: "balance" }}
      {...rest}
    >
      {children}
    </Heading>
  );
}
