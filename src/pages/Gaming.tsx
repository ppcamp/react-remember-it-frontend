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
import { SM2, UserGrade } from "scripts/super-memo-2";

const IMAGE_PATH = ImageAPI.toString();

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

  // States
  const [markdown, setMarkdown] = useState(front);
  const [isFront, setIsFront] = useState(true);
  const [disableBTN, setDisableBTN] = useState(true);

  // Handlers
  const onReview = () => {
    // allows only to see it once
    if (isFront) {
      setIsFront(!isFront);
      setMarkdown(isFront ? back : front);
      setDisableBTN(false);
    }
  };
  const handleNextCard = () => {
    // load the markdown for the next card to review on deck
    setMarkdown("New page");
    // reset those fields
    setIsFront(false);
    setDisableBTN(true);
  };
  const onClickButton = (e: React.MouseEvent<HTMLElement>) => {
    const btnValue = (e.currentTarget as HTMLInputElement).value;
    // Evaluate these values over Super Memo 2
    const [n, EF, I] = SM2({ q: 3, n: 3, EF: 5, I: 3 });

    console.log(btnValue, n, EF, I);
    // Go to the next card to review
    handleNextCard();
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
            <Box px={2}>
              <MarkdownViewer imagePath={IMAGE_PATH} markdown={markdown} />
            </Box>
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
            value={UserGrade.TotalBlackout}
            variant="contained"
            className={classes.btnForgot}
            onClick={onClickButton}
            disabled={disableBTN}
          >
            Esqueci
          </Button>
          <Button
            value={UserGrade.VeryWrong}
            variant="contained"
            className={classes.btnVeryWrong}
            onClick={onClickButton}
            disabled={disableBTN}
          >
            Errei muito
          </Button>
          <Button
            value={UserGrade.Wrong}
            variant="contained"
            className={classes.btnWrong}
            onClick={onClickButton}
            disabled={disableBTN}
          >
            Errei
          </Button>
          <Button
            value={UserGrade.Ok}
            variant="contained"
            className={classes.btnOk}
            onClick={onClickButton}
            disabled={disableBTN}
          >
            Acertei
          </Button>
          <Button
            value={UserGrade.WellDone}
            variant="contained"
            className={classes.btnWellDone}
            onClick={onClickButton}
            disabled={disableBTN}
          >
            Fácil
          </Button>
          <Button
            value={UserGrade.Easy}
            variant="contained"
            className={classes.btnEasy}
            onClick={onClickButton}
            disabled={disableBTN}
          >
            Super fácil
          </Button>
        </div>
      </Box>
    </div>
  );
};

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
