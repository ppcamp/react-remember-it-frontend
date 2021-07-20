import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Alert, { Color } from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Snackbar } from "@material-ui/core";
import { AlertTitle } from "@material-ui/lab";

export type TransitionAlertsProps = {
  message: string;
  title?: string;
  severity: Color;
  timeout?: number;
  remember?: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "auto",
      width: "100%",
      marginTop: theme.spacing(2),
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

export const TransitionAlerts: React.FC<TransitionAlertsProps> = ({
  message,
  title,
  timeout,
  severity,
  remember,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={timeout ? timeout : 6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          style={{ width: "100vh" }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {title && <AlertTitle>{title}</AlertTitle>}
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
