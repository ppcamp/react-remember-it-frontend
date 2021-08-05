/**
 * Card edit
 *
 * TODO: Fix a problem with the buttons group (They are changing its position)
 * TODO: Change submit function
 */
import React, { useState } from "react";
import { CardMarkdownEdit } from "components/cards/CardMarkdownEdit";
import { Box, Button, Container, Grid, useTheme } from "@material-ui/core";
import { NavigateNext, NavigateBefore, Save, Clear } from "@material-ui/icons";
import { Link, useHistory, useParams } from "react-router-dom";
import { ImageAPI } from "api";
import { RouteParams } from "scripts/types/router";
import { styling } from "components/ui/styles/buttons";
import { useAuth } from "hooks/useAuth";
import { useSnackbar } from "notistack";

// API
const IMAGE_PATH = ImageAPI.toString();

export const CardEditPage = () => {
  const history = useHistory();
  // eslint-disable-next-line
  const { deck } = useParams<RouteParams>();
  // eslint-disable-next-line
  const auth = useAuth();

  // States
  const [page, setPage] = useState(true);

  const [editor, setEditor] = useState({
    front: "",
    back: "",
  });

  // handlers
  const handleToggleView = () => {
    setPage(!page);
  };
  const handleFrontChange = (front: string) => {
    setEditor({ ...editor, front });
  };
  const handleBackChange = (back: string) => {
    setEditor({ ...editor, back });
  };

  // Theming
  const theme = useTheme();
  const style = styling(theme);
  // eslint-disable-next-line
  const { enqueueSnackbar } = useSnackbar();

  // Actions
  /**
   * Submit the modified card into deck endpoint
   * TODO: must get the deck infos from the redux store before
   */
  const onSubmit = () => {
    // if (!deck) {
    //   throw new MissingDeckId();
    // } else {
    //   const data: CardEditPayload = {
    //     back: editor.back,
    //     front: editor.front,
    //     deck,
    //     EF: 1,
    //     I: 1,
    //     id: "",
    //     n: 1
    //   };
    //   // update into api
    //   const url = Endpoints.card();
    //   console.debug("MY url: ", url.toString());
    //   axios
    //     .post(url.toString(), data, {
    //       headers: {
    //         ...JwtHeader(auth.token),
    //       },
    //     })
    //     .then(
    //       (r) => {
    //         console.debug("Accepted r=", r.data);
    //         const resp: CardResponsePayload = {
    //           id: r.data.id,
    //           EF: r.data.EF,
    //           I: r.data.I,
    //           back: r.data.back,
    //           front: r.data.front,
    //           n: r.data.n,
    //         };
    //         // update deck into store
    //         dispatch(
    //           decksActions.addCardIntoDeck({ deckId: deck, card: resp })
    //         );
    //         // close the moda
    //         enqueueSnackbar("Cartão adicionado ao baralho com sucesso!", {
    //           variant: "success",
    //         });
    //         // return to the previous screen
    //         history.goBack();
    //       },
    //       (e) => {
    //         enqueueSnackbar(e.response.data.message.join("; "), {
    //           variant: "error",
    //         });
    //       }
    //     );
    // }
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
            onUpdate={handleFrontChange}
            imagePath={IMAGE_PATH}
          />
        )}
        {!page && (
          <CardMarkdownEdit
            name="Atrás"
            editor={editor.back}
            onUpdate={handleBackChange}
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
              onClick={handleToggleView}
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
              onClick={handleToggleView}
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
