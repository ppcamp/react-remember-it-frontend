import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { MenuAppBar } from "components/topbar";
import { MarkdownViewer } from "components/cards/edit/markdownview";
import { ImageAPI } from "api";

const IMAGE_PATH = ImageAPI.toString();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    card: {
      height: "70vh",
    },

    btnForgot: {
      background: "#b50719",
      color: "white",
      "&:hover": {
        backgroundColor: "#940615",
      },
    },
    btnVeryWrong: {
      background: "#c21919",
      color: "white",
      "&:hover": {
        backgroundColor: "#990f0f",
      },
    },
    btnWrong: {
      background: "#670f8a",
      color: "white",
      "&:hover": {
        backgroundColor: "#560d73",
      },
    },
    btnOk: {
      background: "#0d7354",
      color: "white",
      "&:hover": {
        backgroundColor: "#0b6349",
      },
    },
    btnWellDone: {
      background: "#0d7530",
      color: "white",
      "&:hover": {
        backgroundColor: "#0a6328",
      },
    },
    btnEasy: {
      background: "#089c1e",
      color: "white",
      "&:hover": {
        backgroundColor: "#036e13",
      },
    },
  })
);

export const GamingPage = () => {
  // TODO: will receive this data from redux or
  const front = `
  # Some mardkown sample
  ---

  ![image google](http://s2.glbimg.com/z_gIOSUdsxyNGClgVLYVBHBziyw=/0x0:400x400/400x400/s.glbimg.com/po/tt2/f/original/2016/05/20/new-google-favicon-logo.png)
  `;
  const back = `
  # Result`;

  // Css
  const classes = useStyles();

  const [markdown, setMarkdown] = useState(front);
  const [isFront, setIsFront] = useState(true);
  const [disableBTN, setDisableBTN] = useState(true);

  const onReview = () => {
    setIsFront(!isFront);
    setMarkdown(isFront ? back : front);
    setDisableBTN(!disableBTN);
  };

  return (
    <div>
      <MenuAppBar />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        m={1}
        bgcolor="background.paper"
        css={{ width: "50%", margin: "auto" }}
        className={classes.card}
      >
        <Card style={{ width: "100%", margin: 0, padding: 0 }}>
          <CardActionArea className={classes.card} onClick={onReview}>
            <MarkdownViewer imagePath={IMAGE_PATH} markdown={markdown} />
          </CardActionArea>
        </Card>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        py={4}
        css={{ height: "3em", width: "80%", margin: "auto" }}
      >
        <div className={classes.root}>
          <Button
            variant="contained"
            className={classes.btnForgot}
            onClick={() => console.log("clicked")}
            disabled={disableBTN}
          >
            Esqueci
          </Button>
          <Button
            variant="contained"
            className={classes.btnVeryWrong}
            onClick={() => console.log("clicked")}
            disabled={disableBTN}
          >
            Errei muito
          </Button>
          <Button
            variant="contained"
            className={classes.btnWrong}
            onClick={() => console.log("clicked")}
            disabled={disableBTN}
          >
            Errei
          </Button>
          <Button
            variant="contained"
            className={classes.btnOk}
            onClick={() => console.log("clicked")}
            disabled={disableBTN}
          >
            Acertei
          </Button>
          <Button
            variant="contained"
            className={classes.btnWellDone}
            onClick={() => console.log("clicked")}
            disabled={disableBTN}
          >
            Fácil
          </Button>
          <Button
            variant="contained"
            className={classes.btnEasy}
            onClick={() => console.log("clicked")}
            disabled={disableBTN}
          >
            Super fácil
          </Button>
        </div>
      </Box>
    </div>
  );
};
