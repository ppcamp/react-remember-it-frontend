/**
 * Terá todos os decks
 */

import React, { useCallback, useEffect, useState } from "react";
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
import { DecksView } from "components/decks/DecksView";
import { CardType, DeckType } from "scripts/types";
import { MenuAppBar } from "components/MenuAppBar";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deckActions } from "store/slices/deck";
import { cardReviewActions } from "store/slices/review";
import { TransitionAlerts } from "components/ui/TransitionAlerts";
// import { DeckSettings } from "components/decks/deckconfig";
import { ErrorType } from "scripts/shared-types";
import { Mocks } from "assets/mocks/samples";
import { RootState } from "store";

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

const MAX_DECKS_LOAD = 10;

export const Dashboard = ({
  initialErrors,
}: {
  initDecks: DeckType[];
  initialErrors: ErrorType;
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
  const decks = useSelector((state: RootState) => state.deck);
  const dispatch = useDispatch();
  // if has more decks to fetch
  const [hasMoreData, setHasMoreData] = useState(false);
  // error messages
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

    // TODO: Remove this mocking
    setTimeout(() => {
      const deck = Mocks.Decks(MAX_DECKS_LOAD);
      dispatch(deckActions.append(deck));
    }, 2e3);

    // TODO: if the returned data is <= than the MAX_DECKS_LOAD
    setHasMoreData(true);
  }, [dispatch]);

  // Will fetch the data in the first rendering cycle
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  //#endregion

  //#region Actions

  /**
   * Update the title element for the new deck
   * @param title The new string to put into the local variable
   */
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const onUpdateTitle = (title: string) => {
    title = "teste";
    setNewDeck({ ...newDeck, title: title as string });
  };

  /**
   * Update the description element for the new Deck
   * @param description The new string to put into the local variable
   */
  /* eslint-disable @typescript-eslint/no-unused-vars */
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
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const onCloseDeckModal = () => {
    setModal(!modal);
  };

  /**
   * Open the selected deck
   * @param deckId The position of the current deck
   */
  const onClickDeck = (deckId: string) => {
    // change screen
    history.push(`/deck/${deckId}`);
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
      {/* <DeckSettings
        title={newDeck.title as string}
        description={newDeck.description as string}
        updateTitle={onUpdateTitle}
        updateDescription={onUpdateDescription}
        show={modal}
        onClose={onCloseDeckModal}
        deck={newDeck}
        afterSave={afterSave}
      /> */}

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
        onClickDeck={onClickDeck}
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
