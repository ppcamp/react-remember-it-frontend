/**
 * Page that will have some images and animations of this site working
 * STATIC PAGE
 *
 * Será colocado imagens do site com exemplos e algumas animações,
 * quantidade de usuários do sistema, link para api, etc
 */

import React from "react";
import {
  Box,
  Button,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import StickyFooter from "components/StickyFooter";
import { grey, indigo } from "@material-ui/core/colors";
import imgLogo from "assets/images/logo.png";
import imgCard from "assets/images/sample-card.png";
import imgDashboard from "assets/images/sample-dashboard.png";
import imgDeck from "assets/images/sample-deck.png";
import imgReview from "assets/images/sample-review.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    view: {
      height: "100%",
    },
    card: {
      height: "100%",
    },
    login: {
      backgroundColor: indigo[200],
    },
    dashboard: {
      backgroundColor: grey[800],
    },
  })
);

export const DefaultPage = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container direction="row" justify="center" alignItems="center">
        {/* Logo and motivation */}
        <Box p={7} textAlign="center">
          <img src={imgLogo} alt="Logo" width={300} />
          <Box p={5}>
            <Typography>
              Um site para você focar nos estudos! Projetado para ser o mais
              agradável possível.
            </Typography>
          </Box>
          <hr />
        </Box>

        {/* Dashboard */}
        <Grid item xs={12}>
          <Grid container className={classes.view}>
            <Grid item xs={6}>
              <Box
                p={7}
                textAlign="center"
                alignItems="center"
                alignContent="center"
                className={`${classes.card}`}
              >
                <img src={imgDashboard} alt="dashboard" width="100%" />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                p={7}
                textAlign="center"
                display="flex"
                className={`${classes.dashboard} ${classes.card}`}
                fontStyle="italic"
              >
                <Box m="auto">
                  <Typography variant="h4">
                    Os baralhos ficam na tela principal, ao clicar sobre eles
                    você é redirecionado à uma página específica dele, onde você
                    poderá adicionar cartões
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Deck */}
        <Grid item xs={12}>
          <Grid container className={classes.view}>
            <Grid item xs={6}>
              <Box
                p={7}
                textAlign="center"
                display="flex"
                className={`${classes.dashboard} ${classes.card}`}
                fontStyle="italic"
              >
                <Box m="auto">
                  <Typography variant="h4">
                    Os baralhos ficam na tela principal, ao clicar sobre eles
                    você é redirecionado à uma página específica dele, onde você
                    poderá adicionar cartões
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                p={7}
                textAlign="center"
                alignItems="center"
                alignContent="center"
                className={`${classes.card}`}
              >
                <img src={imgDeck} alt="deck" width="100%" />
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Card */}
        <Grid item xs={12}>
          <Grid container className={classes.view}>
            <Grid item xs={6}>
              <Box
                p={7}
                textAlign="center"
                alignItems="center"
                alignContent="center"
                className={`${classes.card}`}
              >
                <img src={imgCard} alt="card" width="100%" />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                p={7}
                textAlign="center"
                display="flex"
                className={`${classes.dashboard} ${classes.card}`}
                fontStyle="italic"
              >
                <Box m="auto">
                  <Typography variant="h4">
                    Os baralhos ficam na tela principal, ao clicar sobre eles
                    você é redirecionado à uma página específica dele, onde você
                    poderá adicionar cartões
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Gaming */}
        <Grid item xs={12}>
          <Grid container className={classes.view}>
            <Grid item xs={6}>
              <Box
                p={7}
                textAlign="center"
                display="flex"
                className={`${classes.dashboard} ${classes.card}`}
                fontStyle="italic"
              >
                <Box m="auto">
                  <Typography variant="h4">
                    Os baralhos ficam na tela principal, ao clicar sobre eles
                    você é redirecionado à uma página específica dele, onde você
                    poderá adicionar cartões
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                p={7}
                textAlign="center"
                alignItems="center"
                alignContent="center"
                className={`${classes.card}`}
              >
                <img src={imgReview} alt="review" width="100%" />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Login into system */}
      <Box p={7} textAlign="center" /*  className={classes.login} */>
        <Button href="/login" variant="contained" color='primary'>
          <Typography variant="h6" color="textPrimary">
            {" "}
            Entre no sistema!
          </Typography>
        </Button>
      </Box>

      {/* footer */}
      <StickyFooter />
    </>
  );
};
