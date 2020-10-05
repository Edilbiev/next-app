import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
  spacing: 10,

  palette: {
    typography: {
      fontFamily: ["Open Sans", "sans-serif"].join(","),
    },

    secondary: {
      main: "#01BDA7",
    },

    primary: {
      main: "#359FF4",
    },
  },
});
