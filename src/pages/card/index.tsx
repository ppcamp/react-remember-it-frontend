/**
 * Card creation
 *
 * TODO: Fix a problem with the buttons group (They are changing its position)
 */

import React, { useState } from "react";
import { CardMarkdownEdit } from "components/cards/edit";
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
import { Link } from "react-router-dom";
import { ImageAPI } from "api";

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

  // Actions
  const onSubmit = () => {};
  const onCancel = () => {};

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
