import React from "react";
import { Box, Fab, Grid, IconButton, Typography } from "@material-ui/core";
import { Add, DeleteForever, Settings } from "@material-ui/icons";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { MenuAppBar } from "components/topbar";
import { RouteParams } from "scripts/shared-types";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useHistory } from "react-router-dom";
import { CardsView } from "components/cards/miniview";
import { CardType } from "scripts/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    fab: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);

export const DeckPage = () => {
  const { id } = useParams<RouteParams>();

  // History
  const history = useHistory();

  // State
  const {
    cards,
    title,
    description,
    id: deckId,
  } = useSelector((state: RootState) => state.deck);

  // Change title
  document.title = `Remember It - Deck ${id}`;

  // style
  const classes = useStyles();

  // Handlers
  const onClickSettings = () => {
    // open settings modal
  };
  const onClickDelete = () => {
    // deleted element

    // open settings modal
    history.push("/dashboard");
  };

  const fetchMoreData = () => {};

  const onClickNewCard = () => {
    if (!deckId) {
      throw new Error("Must exist an deck id");
    }
    const newItem = `/${deckId as string}/card`;
    console.log(newItem);
    history.push(newItem);
  };

  // Render
  return (
    <div>
      <MenuAppBar />

      {/* Deck description */}
      <Box m={4} py={4}>
        <div className={classes.root}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
          >
            <Grid item xs={8}>
              <Typography variant="h4" paragraph>
                {title}
              </Typography>
              <Typography variant="body1" paragraph>
                {description}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Box textAlign="right">
                <IconButton onClick={onClickSettings}>
                  <Settings />
                </IconButton>
                <IconButton onClick={onClickDelete}>
                  <DeleteForever />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </div>
      </Box>

      {/* Cards */}
      <Box p={4}>
        <Typography variant="h6">Cartões</Typography>
      </Box>
      {cards && (
        <CardsView cards={cards as CardType[]} fetchMoreData={fetchMoreData} />
      )}

      {/* Floating button  */}
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        className={classes.fab}
        onClick={onClickNewCard}
      >
        <Add />
        Novo cartão
      </Fab>
    </div>
  );
};
