import { extendTheme, theme as chakraTheme } from "@chakra-ui/react";

const theme = extendTheme({
  ...chakraTheme,
  styles: {
    // global styles
    global: {
      // Style for body of page
      body: {
        bg: "grey",
        color: "#FDFDFD",
      },
    },
  },
  // Website color scheme
  colors: {
    ...chakraTheme.colors,
    primary: "#3BA87E",
    brown: "#6D2100",
    yellow: "#C5A502",
    white: "#FDFDFD",
    black: "#0B0B0B",
  },
});

export default theme;
