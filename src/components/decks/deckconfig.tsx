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
import { styling } from "components/styles/buttons";

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

type DeckSettingsProps = {
  title: string;
  updateTitle: (title: string) => void;
  description: string;
  updateDescription: (description: string) => void;
  show: boolean;
  onClose: () => void;
};

export const DeckSettings: React.FC<DeckSettingsProps> = ({
  title,
  description,
  updateDescription,
  updateTitle,
  show,
  onClose,
}) => {
  const onSave = () => {
    updateDescription(deckDescription);
    updateTitle(deckTitle);
    onClose(); // close the window after change the element
  };
  const [deckTitle, setDeckTitle] = useState(title);
  const [deckDescription, setDeckDescription] = useState(description);

  // Theming
  const classes = useStyles();
  const theme = useTheme();
  const style = styling(theme);

  const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeckDescription(e.target.value);
  };
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeckTitle(e.target.value);
  };

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
