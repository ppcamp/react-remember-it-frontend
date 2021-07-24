/**
 * Card creation/edit view
 * TODO: handle elements trespassing the view panel
 */

// Import react and its needed components
import React, { useState } from "react";
// Material components
import {
  Grid,
  Paper,
  Typography,
  Box,
  Container,
  GridSpacing,
} from "@material-ui/core";
// Components:
import Menu from "./menu";

// japanese formatting
import style from "./index.module.css";
import { MarkdownViewer } from "../MarkdownViewer";
import { TextArea } from "components/TextArea";

type MarkdownEditProps = {
  name: string;
  editor: string;
  onUpdate: (v: string) => void;
  imagePath: string;
  gridSpacing?: GridSpacing;
  cardsSize?: number;
  maxInput?: number;
};

export const CardMarkdownEdit: React.FC<MarkdownEditProps> = ({
  name,
  editor: markdown,
  onUpdate: markdownUpdate,
  imagePath,
  gridSpacing,
  cardsSize,
  maxInput,
}) => {
  // States
  const [cursor, setCursor] = useState({
    start: 0,
    end: 0,
  });
  const [history, setHistory] = useState({
    undo: "",
    redo: "",
  });

  // Constants
  const GRID_SPACING: GridSpacing = gridSpacing || 3;
  const CARDS_SIZE: number = cardsSize || 400;
  const MAXIMUM_INPUT: number = maxInput || 500;
  const PLACEHOLDER = `Digite o texto aqui. Exemplo:

# Algum título
----

Você pode inserir equações matemáticas através do latex:
$2\\cdot x - 1 = 3 \\rightarrow x=2$

Para criar um paragráfo, deixe uma linha em branco.

No menu superior existem alguns outros atalhos que você pode utilizar.
`;

  // Handlers
  const handleMarkdownUpdate = (val: string) => {
    // every time that changes the markdown, will update history
    const hist = { ...history };
    hist.undo = markdown.slice();
    hist.redo = "";

    setHistory(hist);
    markdownUpdate(val);
  };
  const handleUndo = () => {
    const hist = { ...history };
    const undo = hist.undo;
    hist.redo = markdown.slice();
    hist.undo = "";

    setHistory(hist);
    markdownUpdate(undo);
  };
  const handleRedo = () => {
    const hist = { ...history };
    const redo = hist.redo;
    hist.undo = markdown.slice();
    hist.redo = "";

    setHistory(hist);
    markdownUpdate(redo);
  };

  // Actions
  const onChangeMarkdown = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleMarkdownUpdate(e.target.value);

    // Handle cursor position
    setCursor({
      //@ts-ignore
      start: e.target.selectionStart,
      //@ts-ignore
      end: e.target.selectionEnd,
    });
  };

  return (
    <Container>
      <Box height="100vh">
        {/* Title */}
        <Box py={7}>
          <Typography align="center" variant="h4">
            {name}
          </Typography>
        </Box>

        {/* Captions and Menu */}
        <Box my={1}>
          <Grid
            container
            spacing={GRID_SPACING}
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={6} className={style.noPadding}>
              <Menu
                color="background.paper"
                value={markdown}
                update={handleMarkdownUpdate}
                cursor={cursor}
                history={history}
                undo={handleUndo}
                redo={handleRedo}
              />
            </Grid>
            <Grid item xs={6} className={style.noPadding}>
              <Typography
                variant="overline"
                align="center"
                display="block"
                gutterBottom
              >
                Pré visualização
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Edit + View */}
        <Box>
          <Grid
            container
            spacing={GRID_SPACING}
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            {/* Textarea */}
            <Grid item xs={6}>
              <Paper elevation={6} color="background.paper">
                <Box p={2} height={CARDS_SIZE}>
                  <TextArea
                    value={markdown}
                    onChange={onChangeMarkdown}
                    placeholder={PLACEHOLDER}
                    maxLength={MAXIMUM_INPUT}
                  />
                </Box>
              </Paper>
            </Grid>

            {/* Preview */}
            <Grid item xs={6}>
              <Paper elevation={6}>
                <Box p={2} height={CARDS_SIZE} alignItems="center">
                  <MarkdownViewer markdown={markdown} imagePath={imagePath} />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
