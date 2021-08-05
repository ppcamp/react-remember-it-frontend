/**
 * Card creation
 *
 * TODO: Fix a problem with the buttons group (They are changing its position)
 */
import React, { useState } from "react";
import { CardMarkdownEdit } from "components/cards/CardMarkdownEdit";
import { Box, Button, Container, Grid, useTheme } from "@material-ui/core";
import { NavigateNext, NavigateBefore, Save, Clear } from "@material-ui/icons";
import { Link, useParams } from "react-router-dom";
import { ImageAPI } from "api";
import { RouteParams } from "scripts/types/router";
import { styling } from "components/ui/styles/buttons";

// API
const IMAGE_PATH = ImageAPI.toString();

export const CardEditPage = () => {
  const { id } = useParams<RouteParams>();

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
  const onSubmit = () => {
    console.log(id);
  };
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
