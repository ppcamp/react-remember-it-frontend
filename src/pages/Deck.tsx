import React, { useEffect } from "react";
import { Box, Fab, Grid, Typography, IconButton } from "@material-ui/core";
import { Add, DeleteForever, Settings } from "@material-ui/icons";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { MenuAppBar } from "components/topbar";
import { RouteParams } from "scripts/shared-types";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { useHistory } from "react-router-dom";
import { CardsView } from "components/cards/miniview";
import { CardType, DeckType } from "scripts/types";
import { DeckSettings } from "components/decks/deckconfig";
import { deckActions } from "store/slices/deck";
import { Errors } from "scripts/errors";

//#region Styling
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
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    settings: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(3),
    },
  })
);
//#endregion

export const DeckPage = () => {
  // get deck id
  const { id } = useParams<RouteParams>();
  // History
  const history = useHistory();

  //#region styling
  const classes = useStyles();
  // Change title
  document.title = `Remember It - Deck ${id}`;
  //#endregion

  //#region  States
  // redux
  const decks = useSelector((state: RootState) => state.deck);
  const dispatch = useDispatch();
  // get the deck that has this id
  let deck = decks.find((it) => it.id === id);
  // open modal configs
  const [openConfigs, setOpenConfigs] = React.useState(false);
  //#endregion

  //#region Actions

  /**
   * open settings modal
   */
  const onOpenSettingsModal = () => {
    setOpenConfigs(true);
  };

  /**
   *  Close settings modal
   */
  const onCloseSettingsModal = () => {
    setOpenConfigs(false);
  };

  /**
   * Remove the deck
   * TODO: send api request to remove this deck
   */
  const onDeleteDeck = () => {
    // deleted element
    dispatch(deckActions.remove(id));
    history.push("/dashboard");
  };

  /**
   * Create a new card element, redirecting the user into the card page
   */
  const onClickNewCard = () => {
    if (!id.length) {
      throw new Error(Errors.MISSING_ID);
    } else {
      const newCard: string = `/${id}/card`;
      history.push(newCard);
    }
  };

  /**
   * Update a deck title
   * @param title Update the deck title
   */
  const onUpdateTitle = (title: string) => {
    // dispatch(deckActions.update({ title }));
  };

  /**
   * Update a deck description
   * @param description
   */
  const onUpdateDescription = (description: string) => {
    // dispatch(deckActions.update({ description }));
  };

  //#endregion

  //#region Actions

  //#endregion

  // Render
  return (
    <div>
      {/* Modal */}
      <DeckSettings
        deck={id}
        show={openConfigs}
        onClose={onCloseSettingsModal}
      />

      {/* Topbar */}
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
                {deck?.title}
              </Typography>
              <Typography variant="body1" paragraph>
                {deck?.description}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Box textAlign="right">
                <IconButton onClick={onOpenSettingsModal}>
                  <Settings />
                </IconButton>
                <IconButton onClick={onDeleteDeck}>
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
      {deck?.cards && <CardsView deck={id} />}

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
