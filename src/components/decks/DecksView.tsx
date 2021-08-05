/**
 * Terá todos os decks
 */

import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  createStyles,
  Grid,
  Grow,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import { CardType, DeckType } from "scripts/types/types";
import { LoadingIcon, EndIcon } from "components/ui/styles/icons";
import { usePalette } from "hooks/usePalette";

export const DecksView: React.FC<DecksViewProps> = ({
  decks,
  fetchMoreData,
  onClickDeck,
  hasMoreData,
}) => {
  // Theming
  const palette = usePalette();
  const elevation = palette.type === "dark" ? 0 : 5;
  const classes = useStyles();

  return (
    <section style={{ height: "80vh" }}>
      {/* Print cards */}
      {decks && (
        <InfiniteScroll
          dataLength={decks.length}
          next={fetchMoreData}
          hasMore={hasMoreData}
          loader={<LoadingIcon />}
          endMessage={<EndIcon />}
          style={{ display: "flex", flexDirection: "column", left: "300px" }} //To put endMessage and loader to the top.
        >
          <div className={classes.root}>
            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="center"
              spacing={0}
            >
              {decks?.map((val, index) => (
                <Grow in={true} key={index}>
                  <Grid item xs={4}>
                    <Box m={4}>
                      <Card elevation={elevation}>
                        <CardActionArea onClick={() => onClickDeck(val.id)}>
                          <CardHeader
                            title={val.title}
                            subheader={
                              <Typography align="center">
                                <span style={{ color: palette.warning.main }}>
                                  {(val.review as CardType[])?.length || 0}
                                </span>
                                /{(val.cards as CardType[])?.length || 0}
                              </Typography>
                            }
                          />
                          <CardContent>{val.description}</CardContent>
                        </CardActionArea>
                      </Card>
                    </Box>
                  </Grid>
                </Grow>
              ))}
            </Grid>
          </div>
        </InfiniteScroll>
      )}

      {/* Print loading */}
      {!decks && <LoadingIcon />}
    </section>
  );
};

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

type DecksViewProps = {
  decks: DeckType[];
  fetchMoreData: () => void;
  onClickDeck: any;
  hasMoreData: boolean;
};

//#endregion
