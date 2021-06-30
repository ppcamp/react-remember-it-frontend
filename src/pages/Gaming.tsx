import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { useHistory } from "react-router-dom";
import { cardReviewActions } from "store/slices/review";

const IMAGE_PATH = ImageAPI.toString();

export const GamingPage = () => {
  // Css
  const classes = useStyles();

  // get value from store
  const { cards } = useSelector((state: RootState) => state.cardsReview);
  const dispatch = useDispatch();
  const [cardPos, setCardPos] = useState(0);

  // States
  const [markdown, setMarkdown] = useState(cards[0].front);
  const [isFront, setIsFront] = useState(true);
  const [disableBTN, setDisableBTN] = useState(true);

  const history = useHistory();

  // Handlers
  const onReview = () => {
    // allows only to see it the answer once
    if (isFront) {
      setIsFront(!isFront);
      setMarkdown(isFront ? cards[cardPos].front : cards[cardPos].back);
      setDisableBTN(false);
    }
  };
  const handleUpdates = () => {
    // foreach element in the store, update them in the database
    // stores data into database
    cards.forEach((v) => console.log(v));
  };
  const handleNextCard = () => {
    if (cardPos === cards.length - 1) {
      // store into database the modifications of those cards
      handleUpdates();
      // if reached the end of the session, go back to home screen
      history.goBack();
      // force exit
      return;
    } else {
      // update change the current card
      setCardPos((pos) => pos + 1);
    }
    // load the markdown for the next card to review on deck
    setMarkdown(cards[cardPos].front);
    // reset those fields
    setIsFront(true);
    setDisableBTN(true);
  };
  const onClickButton = (e: React.MouseEvent<HTMLElement>) => {
    const btnValue = (e.currentTarget as HTMLInputElement).value;
    // Evaluate these values over Super Memo 2
    const [n, EF, I] = SM2({ q: 3, n: 3, EF: 5, I: 3 });
    // update the current element in the store
    dispatch(cardReviewActions.updateByPos({ pos: cardPos, n, EF, I }));

    console.log(btnValue, n, EF, I);
    // Go to the next card to review
    handleNextCard();
  };

  useEffect(() => {
    console.log(cards);
  }, [cards]);

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
