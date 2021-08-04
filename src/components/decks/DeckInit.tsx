import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import decksActions from "store/slices/deck/actions";
import { DeckPostPayload } from "scripts/types/deck.endpoint";
import axios from "axios";
import { Endpoints } from "api/endpoints";
import { JwtHeader } from "api/axios";
import { useAuth } from "hooks/useAuth";

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
type DeckInitProps = {
  show: boolean;
  onClose: () => void;
};
//#endregion

/**
 *
 * @param show When will open the modal object
 * @param onClose The action that will close the modal itself
 * @returns
 */
export const DeckInit: React.FC<DeckInitProps> = ({ show, onClose }) => {
  //#region States
  const dispatch = useDispatch();
  const [title, setDeckTitle] = useState("");
  const [description, setDeckDescription] = useState("");
  //#endregion

  //#region Styling
  const classes = useStyles();
  const theme = useTheme();
  const style = styling(theme);
  //#endregion

  //#region Actions
  const auth = useAuth();

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
   * Update the element in the store
   */
  const onSave = () => {
    // get deck
    const deck: DeckPostPayload = {
      description,
      title,
    };

    const url = Endpoints.deck().toString();
    axios
      .post(url, deck, {
        headers: {
          ...JwtHeader(auth.token),
        },
      })
      .then((r) => {
        console.log("Accepted r=", r.data);
        // update deck into store
        dispatch(decksActions.append(r.data));
        // close the modal
        onClose();
      })
      .catch((r) => console.log("REJECTED r=", r));
  };
  //#endregion

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={show}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      disableEscapeKeyDown
      disableBackdropClick
    >
      <Fade in={show}>
        <Box className={classes.settings}>
          <Typography variant="h5">Configurações</Typography>
          <Box my={5}>
            <Grid
              container
              spacing={2}
              direction="row"
              justify="space-between"
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
                  value={title}
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
                  value={description}
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
