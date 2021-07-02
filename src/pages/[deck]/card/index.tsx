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
import { RouteParams } from "scripts/shared-types";
import { useDispatch } from "react-redux";
import decksActions from "store/slices/deck/actions";
import { CardSendType, CardType } from "scripts/types";
import {
  EasienessFactorDefault,
  IntervalDefault,
  RepetetionsDefault,
} from "scripts/super-memo-2";
import { Errors } from "scripts/errors";

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

  // Actions
  /**
   * Submit the card into the api and add them into deck
   */
  const onSubmit = () => {
    if (!deck) {
      throw new Error(Errors.MISSING_ID);
    } else {
      const input: CardSendType = {
        back: editor.back,
        front: editor.front,
        EF: EasienessFactorDefault,
        n: RepetetionsDefault,
        I: IntervalDefault,
      };

      // TODO: submit into api
      // get the id
      const card: CardType = { ...input, id: "some_id_asdasdasd" };

      // update into store
      dispatch(decksActions.addCardIntoDeck({ deckId: deck, card }));

      // return to the previous screen
      history.goBack();
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
          justify="center"
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
