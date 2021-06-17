import React, { useState } from "react";
import { CardEdit } from "components/cards/edit";
import { Box, Button, Container, makeStyles } from "@material-ui/core";
import { NavigateNext, NavigateBefore, Save, Clear } from "@material-ui/icons";
import { red, green } from "@material-ui/core/colors";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  save: {
    background: green[900],
    color: "#fff",
    "&:hover": {
      backgroundColor: green["A700"],
    },
  },
  cancel: {
    background: red[900],
    color: "#fff",
    "&:hover": {
      backgroundColor: red["A700"],
    },
  },
}));

export const CardCreate = (props) => {
  const classes = useStyles();

  const [name, setName] = useState("Frente");

  const onClickNext = () => {
    setName("Atrás");
  };
  const onClickBack = () => {
    setName("Frente");
  };

  const submit = () => {};
  const cancel = () => {};

  return (
    <Container>
      <CardEdit name={name} />
      <Box p={2} textAlign='center'>
        <Button
          aria-label='cancel this action'
          component={Link}
          variant='contained'
          onClick={cancel}
          className={`${classes.button} ${classes.cancel}`}
          startIcon={<Clear />}
          color='primary'
          to='/'
        >
          Cancelar
        </Button>

        <Button
          aria-label='goes back'
          component='span'
          variant='contained'
          onClick={onClickBack}
          className={classes.button}
          startIcon={<NavigateBefore />}
          color='primary'
          disabled={name === "Frente"}
        >
          Voltar
        </Button>

        <Button
          aria-label='write the back part'
          component='span'
          variant='contained'
          onClick={onClickNext}
          className={classes.button}
          color='primary'
          startIcon={<NavigateNext />}
          disabled={name === "Atrás"}
        >
          Avançar
        </Button>
        <Button
          aria-label='save in the database'
          component='span'
          variant='contained'
          onClick={submit}
          className={`${classes.button} ${classes.save}`}
          startIcon={<Save />}
          disabled={name === "Frente"}
        >
          Salvar
        </Button>
      </Box>
    </Container>
  );
};
