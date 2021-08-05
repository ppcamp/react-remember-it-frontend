/**
 * Card creation
 *
 * TODO: Fix a problem with the buttons group (They are changing its position)
 */

import React, { useState } from "react";
import { CardMarkdownEdit } from "components/cards/CardMarkdownEdit";
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core";
import { NavigateNext, NavigateBefore, Save, Clear } from "@material-ui/icons";
import { Link, useHistory, useParams } from "react-router-dom";
import { ImageAPI } from "api";
import { RouteParams } from "scripts/types/router";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import {
  CardCreatePayload,
  CardResponsePayload,
} from "scripts/types/card.endpoint";
import { Endpoints } from "api/endpoints";
import axios from "axios";
import { JwtHeader } from "api/axios";
import { useAuth } from "hooks/useAuth";
import decksActions from "store/slices/deck/actions";
import { MissingDeckId } from "scripts/errors/missing-deck-id";

const styling = makeStyles((theme: Theme) => ({
  save: {
    background: theme.palette.success.main,
    color: "#fff",
    "&:hover": {
      backgroundColor:
        theme.palette.type === "dark"
          ? theme.palette.success.dark
          : theme.palette.success.light,
    },
  },
  cancel: {
    background: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    "&:hover": {
      backgroundColor:
        theme.palette.type === "dark"
          ? theme.palette.error.dark
          : theme.palette.error.light,
    },
  },
}));

// API
const IMAGE_PATH = ImageAPI.toString();

export const CardCreatePage = () => {
  const history = useHistory();
  const { deck } = useParams<RouteParams>();
  const auth = useAuth();

  //#region States
  const [page, setPage] = useState(true);
  const dispatch = useDispatch();

  const [editor, setEditor] = useState({
    front: "",
    back: "",
  });
  //#endregion

  //#region Actions
  const onToggleView = () => {
    setPage(!page);
  };
  const onFrontChange = (front: string) => {
    setEditor({ ...editor, front });
  };
  const onBackChange = (back: string) => {
    setEditor({ ...editor, back });
  };

  // Theming
  const theme = useTheme();
  const style = styling(theme);
  const { enqueueSnackbar } = useSnackbar();

  // Actions
  /**
   * Submit the card into the api and add them into deck
   */
  const onSubmit = () => {
    if (!deck) {
      throw new MissingDeckId();
    } else {
      const data: CardCreatePayload = {
        back: editor.back,
        front: editor.front,
        deck,
      };

      // update into api
      const url = Endpoints.card();
      console.debug("MY url: ", url.toString());
      axios
        .post(url.toString(), data, {
          headers: {
            ...JwtHeader(auth.token),
          },
        })
        .then(
          (r) => {
            console.debug("Accepted r=", r.data);

            const resp: CardResponsePayload = {
              id: r.data.id,
              EF: r.data.EF,
              I: r.data.I,
              back: r.data.back,
              front: r.data.front,
              n: r.data.n,
            };
            // update deck into store
            dispatch(
              decksActions.addCardIntoDeck({ deckId: deck, card: resp })
            );
            // close the moda
            enqueueSnackbar("Cartão adicionado ao baralho com sucesso!", {
              variant: "success",
            });
            // return to the previous screen
            history.goBack();
          },
          (e) => {
            enqueueSnackbar(e.response.data.message.join("; "), {
              variant: "error",
            });
          }
        );
    }
  };
  /**
   * Goes back to the previous screen
   */
  const onCancel = () => {
    history.goBack();
  };

  return (
    <Container>
      {/* Views */}
      <Container>
        {page && (
          <CardMarkdownEdit
            name="Frente"
            editor={editor.front}
            onUpdate={onFrontChange}
            imagePath={IMAGE_PATH}
          />
        )}
        {!page && (
          <CardMarkdownEdit
            name="Atrás"
            editor={editor.back}
            onUpdate={onBackChange}
            imagePath={IMAGE_PATH}
          />
        )}
      </Container>

      {/* ButtonGroup */}
      <Box p={0} textAlign="center" display="block">
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Button
              aria-label="cancel this action"
              variant="contained"
              startIcon={<Clear />}
              className={style.cancel}
              size="medium"
              onClick={onCancel}
              component={Link}
              to="/"
            >
              Cancelar
            </Button>
          </Grid>

          <Grid item>
            <Button
              aria-label="goes back"
              variant="contained"
              startIcon={<NavigateBefore />}
              color="primary"
              size="medium"
              onClick={onToggleView}
              component="span"
              disabled={page}
            >
              Voltar
            </Button>
          </Grid>
          <Grid item>
            <Button
              aria-label="write the back part"
              variant="contained"
              startIcon={<NavigateNext />}
              color="primary"
              size="medium"
              onClick={onToggleView}
              component="span"
              disabled={!page}
            >
              Avançar
            </Button>
          </Grid>
          <Grid item>
            <Button
              aria-label="save in the database"
              variant="contained"
              startIcon={<Save />}
              className={style.save}
              size="medium"
              onClick={onSubmit}
              component="span"
              disabled={page}
            >
              Salvar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
