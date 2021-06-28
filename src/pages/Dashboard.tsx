/**
 * Terá todos os decks
 */

import {
  Box,
  CircularProgress,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { usePalette } from "app/static-contexts/theme-context";
import { MenuAppBar } from "components/topbar";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

//#region styles

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    cards: {
      padding: theme.spacing(3),
      textAlign: "center",
      color: theme.palette.text.secondary,
      height: "10rem",
    },
  })
);
//#endregion

//#region Types
type Card = {
  id: string | number;
  front: string;
  back: string;
};
type Deck = {
  id: string | number;
  title: string;
  description: string;
  cards: Card[];
};
const initDecks: Deck[] = new Array(30).fill(0);
//#endregion

export const Dashboard = () => {
  const palette = usePalette();
  const elevation = palette.type === "dark" ? 0 : 3;
  const classes = useStyles();
  const [decks, setDecks] = useState(initDecks);

  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      const new_el = new Array(30).fill(1);
      setDecks((decks: React.ComponentState) => [...decks, ...new_el]);
    }, 1500);
  };
  useEffect(() => {
    console.log(decks);
  }, [decks]);

  const loadingIcon = (
    <Box m={4} alignItems="center" display="flex" justifyContent="space-around">
      <Box>
        <CircularProgress />
      </Box>
    </Box>
  );

  return (
    <div>
      <Box mt={2} mb={4}>
        <MenuAppBar />
      </Box>

      {/* Carroussel of cards to review */}
      <Box m={4} py={4}>
        <section>
          <Typography variant="h6">Cartões para revisar</Typography>
        </section>
      </Box>

      {/* Decks with lazy loading and infinite scroll */}
      <Box p={4}>
        <Typography variant="h6">Baralhos</Typography>
      </Box>

      <section style={{ height: "80vh" }}>
        <InfiniteScroll
          dataLength={decks.length}
          next={fetchMoreData}
          hasMore={true}
          // loader={<h4>Loading...</h4>}
          loader={loadingIcon}
          style={{ display: "flex", flexDirection: "column", left: "300px" }} //To put endMessage and loader to the top.
        >
          <div className={classes.root}>
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
              spacing={0}
            >
              {decks.map((i, index) => (
                <Grid item key={index} xs={4}>
                  <Box m={4}>
                    <Paper className={classes.cards} elevation={elevation}>
                      <Typography variant="subtitle1" align="left">
                        Grid item - #{index}
                      </Typography>
                    </Paper>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </div>
        </InfiniteScroll>
      </section>
    </div>
  );
};
