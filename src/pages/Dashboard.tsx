/**
 * Terá todos os decks
 */

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CircularProgress,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { usePalette } from "app/static-contexts/theme-context";
import { MenuAppBar } from "components/topbar";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory } from "react-router-dom";

//#region samples
namespace Samples {
  export const Cards: CardType[] = Array.from({ length: 10 }, (_, i) => {
    const a: CardType = {
      back: "Parte de trás de um card",
      front: "Parte da frente de um card",
      id: i,
    };
    a.id = i;
    return a;
  });

  export const Decks = Array.from({ length: 30 }, (_, i) => {
    const el: DeckType = {
      review: Cards,
      cards: Cards,
      id: i,
      title: `Some title for deck #${i}`,
      description:
        "Qui eiusmod sint mollit ullamco aliquip tempor pariatur ipsum ut mollit minim sint. Lorem exercitation id minim in e.",
    };
    return el;
  });
}
//#endregion

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
type CardType = {
  id: string | number;
  front: string;
  back: string;
};
type DeckType = {
  id: string | number;
  title: string;
  description: string; //
  cards: CardType[]; // all cards
  review: CardType[]; // cards to review
};

//#endregion

export const Dashboard = ({ initDecks }: { initDecks: DeckType[] }) => {
  // Change header
  document.title += ": Dashboard";

  // Path change
  const history = useHistory();

  // Theming
  const palette = usePalette();
  const elevation = palette.type === "dark" ? 0 : 5;
  const classes = useStyles();
  const loadingIcon = (
    <Box m={4} alignItems="center" display="flex" justifyContent="space-around">
      <Box>
        <CircularProgress />
      </Box>
    </Box>
  );

  // States
  const [decks, setDecks] = useState(initDecks);
  useEffect(() => {
    // Will fetch the data in the first rendering cycle
    setDecks(Samples.Decks);
  }, []);

  // Handlers
  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      const new_el = Samples.Decks;
      setDecks((decks: React.ComponentState) => [...decks, ...new_el]);
    }, 1500);
  };

  // Actions
  const onClickCard = (id: number | string) => history.push(`/deck/${id}`);

  // Renderer
  return (
    <div>
      <Box mt={2} mb={4}>
        <MenuAppBar />
      </Box>

      {/* Carroussel of cards to review */}
      <Box m={4} py={4}>
        <section>
          <Typography variant="h6">Revisão</Typography>
        </section>
      </Box>

      {/* Decks with lazy loading and infinite scroll */}
      <Box p={4}>
        <Typography variant="h6">Baralhos</Typography>
      </Box>

      <section style={{ height: "80vh" }}>
        {decks && (
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
                {decks.map((val, index) => (
                  <Grid item key={index} xs={4}>
                    <Box m={4}>
                      <Card elevation={elevation}>
                        <CardActionArea onClick={() => onClickCard(val.id)}>
                          <CardHeader
                            title={val.title}
                            subheader={
                              <Typography align="center">
                                <span style={{ color: palette.warning.main }}>
                                  {val.review.length}
                                </span>
                                /{val.cards.length}
                              </Typography>
                            }
                          />
                          <CardContent>{val.description}</CardContent>
                        </CardActionArea>
                      </Card>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </div>
          </InfiniteScroll>
        )}
      </section>
    </div>
  );
};
