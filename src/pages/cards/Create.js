import React from "react";
import { CardEdit } from "components/cards/edit/index";
import { Button, Container, Grid, makeStyles } from "@material-ui/core";
import { NavigateNext } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export const CardCreate = (props) => {
  const classes = useStyles();

  const submitFront = () => {
    console.log("Submit the front part");
  };
  const submitBack = () => {
    console.log("Submit the back part");
  };

  return (
    <Container>
      <CardEdit name='Frente' />
      <Button
        aria-label='upload picture'
        component='span'
        variant='contained'
        color='secondary'
        onClick={() => console.log("test")}
        className={classes.button}
        startIcon={<NavigateNext />}
      >
        Avançar
      </Button>
    </Container>
  );
};
