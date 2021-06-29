import { makeStyles, Theme } from "@material-ui/core";

export const styling = makeStyles((theme: Theme) => ({
  save: {
    background: theme.palette.success.main,
    color: "#fff",
    "&:hover": {
      backgroundColor:
        theme.palette.type === "dark"
          ? theme.palette.success.dark
          : theme.palette.success.light,
    },
  },
  cancel: {
    background: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    "&:hover": {
      backgroundColor:
        theme.palette.type === "dark"
          ? theme.palette.error.dark
          : theme.palette.error.light,
    },
  },
}));
