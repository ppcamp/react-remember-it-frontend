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

//#region samples
namespace Samples {
  export const Cards: CardType[] = Array.from({ length: 10 }, (_, i) => {
    const a: CardType = {
      back: "Parte de trás de um card",
      front: "Parte da frente de um card",
      id: i,
    };
    a.id = i;
    return a;
  });

  export const Decks = Array.from({ length: 30 }, (_, i) => {
    const el: DeckType = {
      review: Cards,
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

export const Dashboard = ({ initDecks }: { initDecks: DeckType[] }) => {
  // redux store
  const dispatch = useDispatch();

  // styling
  const classes = useStyles();

  // Change header
  document.title = "Remember It - Dashboard";

  // Path change
  const history = useHistory();

  // States
  const [decks, setDecks] = useState(initDecks);
  const [hasMoreData, setHasMoreData] = useState(true);

  // Handlers
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

  // TODO: change to api update
  // Will fetch the data in the first rendering cycle
  useEffect(() => {
    fetchData();
    setHasMoreData(false);
  }, [fetchData]);

  // Actions
  const onClickCard = (index: number | string) => {
    // change screen
    history.push(`/deck/${index}`);
    // change store
    const deck = decks.find((_, i) => i === index);
    dispatch(deckActions.update(deck as DeckType));
  };
  const onClickNewDeck = () => {
    console.log("new deck");
  };

  // Renderer
  return (
    <div>
      <MenuAppBar />

      {/* Decks with lazy loading and infinite scroll */}
      <Box p={4}>
        <Grid container justify="space-between" alignItems="flex-start">
          <Grid item xs={9}>
            <Typography variant="h6">Baralhos</Typography>
          </Grid>
          <Grid item xs={3}>
            <Box textAlign="right">
              <Button startIcon={<PlayArrow />}> Revisar tudo</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <DecksView
        decks={decks}
        fetchMoreData={fetchData}
        onClickCard={onClickCard}
        hasMoreData={hasMoreData}
      />

      {/* Floating button */}
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        className={classes.fab}
        onClick={onClickNewDeck}
      >
        <Add />
        Novo baralho
      </Fab>
    </div>
  );
};
