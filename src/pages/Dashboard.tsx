/**
 * Terá todos os decks
 */

import {
  Box,
  createStyles,
  Fab,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { DecksView, CardType, DeckType } from "components/decks";
import { MenuAppBar } from "components/topbar";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

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
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);
//#endregion

export const Dashboard = ({ initDecks }: { initDecks: DeckType[] }) => {
  // styling
  const classes = useStyles();

  // Change header
  document.title += ": Dashboard";

  // Path change
  const history = useHistory();

  // States
  const [decks, setDecks] = useState(initDecks);

  // Handlers
  const fetchData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      const new_el = Samples.Decks;
      setDecks((decks: React.ComponentState) => [...decks, ...new_el]);
    }, 1500);
  };
  useEffect(() => {
    // Will fetch the data in the first rendering cycle
    setDecks(Samples.Decks);
  }, []);

  // Actions
  const onClickCard = (id: number | string) => history.push(`/deck/${id}`);

  // Renderer
  return (
    <div>
      <Box mt={2} mb={4}>
        <MenuAppBar />
      </Box>

      {/* Carroussel of cards to review */}
      <Box m={4} py={4}>
        <Typography variant="h6">Revisão</Typography>
      </Box>
      <section></section>

      {/* Decks with lazy loading and infinite scroll */}
      <Box p={4}>
        <Typography variant="h6">Baralhos</Typography>
      </Box>
      <DecksView
        decks={decks}
        fetchMoreData={fetchData}
        onClickCard={onClickCard}
      />

      <Fab color="secondary" className={classes.fab}>
        <Add />
      </Fab>
    </div>
  );
};
