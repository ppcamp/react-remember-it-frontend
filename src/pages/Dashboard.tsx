/**
 * Terá todos os decks
 */

import {
  Box,
  Button,
  createStyles,
  Fab,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { Add, PlayArrow } from "@material-ui/icons";
import { DecksView } from "components/decks";
import { CardType, DeckType } from "scripts/types";
import { MenuAppBar } from "components/topbar";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deckActions } from "store/slices/deck";
import { cardReviewActions } from "store/slices/review";
import { TransitionAlerts } from "components/alerts";
import { Color } from "@material-ui/lab";
import { DeckSettings } from "components/decks/deckconfig";

//#region samples
namespace Samples {
  export const Cards: CardType[] = Array.from({ length: 10 }, (_, i) => {
    const a: CardType = {
      back: "Parte de trás de um card",
      front: "Parte da frente de um card",
      id: i,
      n: 0,
      EF: 2.5,
      I: 0,
    };
    a.id = i;
    return a;
  });

  export const Decks = Array.from({ length: 30 }, (_, i) => {
    const el: DeckType = {
      review: i < 1 ? Cards : [],
      cards: Cards,
      id: i,
      title: `Some title for deck #${i}`,
      description:
        "Qui eiusmod sint mollit ullamco aliquip tempor pariatur ipsum ut mollit minim sint. Lorem exercitation id minim in e.",
    };
    return el;
  });
}
//#endregion

//#region styling
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);
//#endregion

//#region reducers
type ErrorState = {
  show: boolean;
  type: Color;
  message: string;
};
//#endregion

export const Dashboard = ({
  initDecks,
  initialErrors,
  initNewDeck,
}: {
  initDecks: DeckType[];
  initialErrors: ErrorState;
  initNewDeck: DeckType;
}) => {
  //#region styling
  const classes = useStyles();

  // Change header
  document.title = "Remember It - Dashboard";
  //#endregion

  // Path change
  const history = useHistory();

  //#region States

  // redux store
  const dispatch = useDispatch();

  const [decks, setDecks] = useState(initDecks);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [error, setError] = useState(initialErrors);
  const [modal, setModal] = useState(false);
  const [newDeck, setNewDeck] = useState({
    id: -1,
    title: "",
    description: "",
    cards: [],
    review: [],
  });
  //#endregion

  //#region Handlers
  const fetchData = useCallback(() => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs

    setTimeout(() => {
      const new_el = Samples.Decks;
      setDecks((decks: React.ComponentState) => {
        if (decks) {
          return [...decks, ...new_el];
        } else {
          return new_el;
        }
      });
      // setHasMoreData(false);
    }, 2e3);
  }, []);

  /**
   * TODO: send to API and get the ID, put the id in the object and add
   *        them into deck list
   */
  const afterSave = () => {
    onUpdateDescription("testeaa");
    console.log(newDeck);
    setDecks((decks) => [newDeck, ...decks]);
  };

  // TODO: change to api update
  // Will fetch the data in the first rendering cycle
  useEffect(() => {
    fetchData();
    setHasMoreData(false);
  }, [fetchData]);
  //#endregion

  //#region Actions

  /**
   * Update the title element for the new deck
   * @param title The new string to put into the local variable
   */
  const onUpdateTitle = (title: string) => {
    title = "teste";
    setNewDeck({ ...newDeck, title: title as string });
  };

  /**
   * Update the description element for the new Deck
   * @param description The new string to put into the local variable
   */
  const onUpdateDescription = (description: string) => {
    description = "aaaaaaaaaaa";
    setNewDeck({ ...newDeck, description: description as string });
  };

  /**
   * Opens the modal for the new deck elements
   */
  const onOpenDeckModal = () => {
    setModal(true);
  };

  /**
   * Opens the modal element
   */
  const onCloseDeckModal = () => {
    setModal(!modal);
  };

  /**
   * Open the selected deck
   * @param index The position of the current deck
   */
  const onClickDeck = (index: number | string) => {
    // change screen
    history.push(`/deck/${index}`);
    // change store
    const deck = decks.find((_, i) => i === index);
    dispatch(deckActions.update(deck as DeckType));
  };

  /**
   * Opens the gaming for all cards to review in the current deck
   * This will filter the current decks loaded
   */
  const onClickToReview = () => {
    const payload: CardType[] = [];
    decks
      // getting all cards to review inside all loaded decks
      .filter((val) => val.review?.length)
      // concatenating all cards into one single vector
      .forEach((deck) => {
        if (deck.review) payload.push(...deck.review);
      });

    if (!payload.length) {
      setError({
        message: "Não existem cartões para revisar",
        show: true,
        type: "error",
      });
    } else {
      dispatch(cardReviewActions.update(payload));
      history.push("/remember-it");
    }
  };
  //#endregion

  // Renderer
  return (
    <div>
      {/* Creating a new deck */}
      <DeckSettings
        title={newDeck.title as string}
        description={newDeck.description as string}
        updateTitle={onUpdateTitle}
        updateDescription={onUpdateDescription}
        show={modal}
        onClose={onCloseDeckModal}
        deck={newDeck}
        afterSave={afterSave}
      />

      {/* Navbar */}
      <MenuAppBar />

      {/* Decks with lazy loading and infinite scroll */}
      <Box p={4}>
        <Grid container justify="space-between" alignItems="flex-start">
          {/* Title */}
          <Grid item xs={9}>
            <Typography variant="h6">Baralhos</Typography>
          </Grid>

          {/* Play */}
          <Grid item xs={3}>
            <Box textAlign="right">
              <Button
                startIcon={<PlayArrow />}
                onClick={onClickToReview}
                disabled={!decks || error !== undefined}
              >
                Revisar tudo
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <DecksView
        decks={decks}
        fetchMoreData={fetchData}
        onClickCard={onClickDeck}
        hasMoreData={hasMoreData}
      />

      {/* Floating button */}
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        className={classes.fab}
        onClick={onOpenDeckModal}
      >
        <Add />
        Novo baralho
      </Fab>

      {/* Alerts */}
      {error && error.show && (
        <TransitionAlerts severity={error.type} message={error.message} />
      )}
    </div>
  );
};
