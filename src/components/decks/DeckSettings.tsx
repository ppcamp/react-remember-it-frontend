import React, { useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  createStyles,
  Fade,
  Grid,
  makeStyles,
  Modal,
  TextField,
  Theme,
  Typography,
  useTheme,
} from "@material-ui/core";
import { Clear, Save } from "@material-ui/icons";
import { styling } from "components/ui/styles/buttons";
import { DeckType } from "scripts/types/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { Errors } from "scripts/errors/errors";
import decksActions from "store/slices/deck/actions";
import { useHistory } from "react-router-dom";

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

//#region types
type DeckSettingsProps = {
  deck: string;
  show: boolean;
  onClose: () => void;
};
//#endregion

/**
 *
 * @param deck The deck id
 * @param show When will open the modal object
 * @param onClose The action that will close the modal itself
 * @param afterSave The function that, when passed, will execute at the end of an save trigger.
 * @returns
 */
export const DeckSettings: React.FC<DeckSettingsProps> = ({
  deck,
  show,
  onClose,
}) => {
  //#region States
  const dispatch = useDispatch();
  const decks = useSelector((state: RootState) => state.decks);
  const [deckTitle, setDeckTitle] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const history = useHistory();

  useEffect(() => {
    // if no deck was found with this id, redirect to dashboard
    // example: if you reload the deck page, it'll lose all decks under
    // redux ctx, doing so, the proper deck itself will be lost,
    // the naive approach is force the user to reload the content all over again.
    const d = decks.find((it) => it.id === deck);
    if (!d) {
      history.push("/dashboard");
    } else {
      setDeckTitle(d.title);
      setDeckDescription(d.description);
    }
  }, [decks, deck, history]);
  //#endregion

  //#region Styling
  const classes = useStyles();
  const theme = useTheme();
  const style = styling(theme);
  //#endregion

  //#region Actions

  /**
   * Update the description
   * @param e The event handler
   */
  const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeckDescription(e.target.value);
  };

  /**
   * Update the title
   * @param e The event handler
   */
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeckTitle(e.target.value);
  };

  /**
   * TODO: changes the data into api
   * Update the element in the store
   */
  const onSave = () => {
    // get deck
    const d = decks.find((it) => it.id === deck);
    if (!d) throw new Error(Errors.MISSING_ID);

    const editDeck: DeckType = {
      ...d,
      description: deckDescription,
      title: deckTitle,
    };

    // update deck into store
    dispatch(decksActions.splice(editDeck));

    // close the modal
    onClose();
  };
  //#endregion

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={show}
      onClose={(event, reason) => {
        if (reason !== "backdropClick") onClose();
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      disableEscapeKeyDown
    >
      <Fade in={show}>
        <Box className={classes.settings}>
          <Typography variant="h5">Configurações</Typography>
          <Box my={5}>
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={4}>
                Título do baralho
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  value={deckTitle}
                  onChange={onChangeTitle}
                />
              </Grid>

              <Grid item xs={4}>
                Descrição do baralho
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  value={deckDescription}
                  onChange={onChangeDescription}
                />
              </Grid>
            </Grid>
          </Box>
          <Box mt={6} textAlign="right">
            <Button
              variant="contained"
              startIcon={<Clear />}
              className={style.cancel}
              size="medium"
              onClick={onClose}
              style={{ marginRight: theme.spacing(3) }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              startIcon={<Save />}
              className={style.save}
              size="medium"
              onClick={onSave}
            >
              Salvar
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
