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
import React from "react";
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
export type CardType = {
  id: string | number;
  front: string;
  back: string;
};
export type DeckType = {
  id: string | number;
  title: string;
  description: string; //
  cards: CardType[]; // all cards
  review: CardType[]; // cards to review
};

type DecksViewProps = {
  decks: DeckType[];
  fetchMoreData: () => void;
  onClickCard: any;
};

//#endregion

export const DecksView: React.FC<DecksViewProps> = ({
  decks,
  fetchMoreData,
  onClickCard,
}) => {
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

  return (
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
  );
};
