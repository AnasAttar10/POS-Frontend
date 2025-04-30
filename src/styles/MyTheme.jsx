import { pink, teal } from "@mui/material/colors";

const getDesignTokens = (modee) => ({
  palette: {
    mode: modee,
    ...(modee === "light"
      ? {
          activeLink: {
            main: pink[500],
          },
        }
      : {
          activeLink: {
            main: teal[500],
          },
        }),
  },
});
export default getDesignTokens;
