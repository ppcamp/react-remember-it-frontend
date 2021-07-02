/**
 * Terá todos os decks
 */

import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  createStyles,
  Grid,
  makeStyles,
  Tab,
  Tabs,
  Theme,
  IconButton,
} from "@material-ui/core";
import { usePalette } from "app/static-contexts/theme-context";
import { CardType } from "scripts/types";
import { DeleteForever } from "@material-ui/icons";
import { MarkdownViewer } from "./MarkdownViewer";
import { ImageAPI } from "api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import decksActions from "store/slices/deck/actions";

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
      height: "15rem",
    },
  })
);
//#endregion

//#region types
type CardViewProps = {
  deck: string;
};
type TableCellPanelProps = {
  isFront: boolean;
  front: string;
  back: string;
  imagePath: string;
};
//#endregion

/**
 * Shows the equivalent card view
 * @param id The card id
 * @param back The backview for a card
 * @param front The frontview for a card
 */
const TableCellPanel: React.FC<TableCellPanelProps> = ({
  front,
  back,
  isFront,
  imagePath,
}) => {
  const el = isFront ? front : back;
  const classes = useStyles();
  return (
    <div className={classes.cards}>
      <MarkdownViewer markdown={el} imagePath={imagePath} />
    </div>
  );
};

/**
 * Shows the cell equivalent with special actions
 * @param id The card id
 * @param back The backview for a card
 * @param front The frontview for a card
 */
const TableCell: React.FC<
  CardType & { imagePath: string; onDelete: (cardId: string) => void }
> = ({ front, back, id, imagePath, onDelete }) => {
  const [isFront, setIsFront] = useState(true);
  const handleChange = () => setIsFront(!isFront);

  return (
    <div>
      <CardContent>
        <CardHeader
          action={
            <IconButton
              aria-label="remove this card"
              onClick={() => onDelete(id)}
            >
              <DeleteForever />
            </IconButton>
          }
        />
        <TableCellPanel
          front={front}
          back={back}
          isFront={isFront}
          imagePath={imagePath}
        />
      </CardContent>
      <Tabs
        value={isFront ? 0 : 1}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="tab group example"
        variant="fullWidth"
      >
        <Tab label="Frente" />
        <Tab label="Atrás" />
      </Tabs>
    </div>
  );
};

// API
const IMAGE_PATH = ImageAPI.toString();

/**
 * Shows a grid with all cards passed through
 * @param cards The cards to show in the deck page
 */
export const CardsView: React.FC<CardViewProps> = ({ deck }) => {
  //#region States
  const decks = useSelector((state: RootState) => state.decks);
  const dispatch = useDispatch();
  const cards = decks.find((it) => it.id === deck)?.cards;
  //#endregion

  //#region Styling
  const palette = usePalette();
  const elevation = palette.type === "dark" ? 0 : 5;
  const classes = useStyles();
  //#endregion

  //#region Actions
  /**
   * Remove a card from the deck
   * @param cardId The id of a given card
   */
  const onClickDelete = (cardId: string) => {
    dispatch(decksActions.removeCardFromDeck({ deckId: deck, cardId }));
  };
  //#endregion

  return (
    <section style={{ height: "80vh" }}>
      {cards && (
        <div className={classes.root}>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            spacing={0}
          >
            {cards?.map((val, index) => (
              <Grid item key={index} xs={4}>
                <Box m={4}>
                  <Card elevation={elevation}>
                    <TableCell
                      {...val}
                      imagePath={IMAGE_PATH}
                      onDelete={onClickDelete}
                    />
                  </Card>
                </Box>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </section>
  );
};