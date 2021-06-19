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
  useTheme,
} from "@material-ui/core";
// Markdown
import ReactMarkdown from "react-markdown";
// plugin: support other functionalities (like tables)
import gfm from "remark-gfm";
// plugin: support html native
import rehypeRaw from "rehype-raw";
// plugin: support to math
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
// Components:
import Menu from "./menu";

// japanese formatting
import style from "./index.module.css";
import { TextArea } from "components/common/textarea";

export const CardMarkdownEdit = ({
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

  // Theming
  const theme = useTheme();
  const borderImage = {
    border:
      theme.palette.type === "dark" ? "1px #555 solid" : "1px #ebebeb solid",
  };

  // Constants
  const GRID_SPACING = gridSpacing || 3;
  const CARDS_SIZE = cardsSize || 400;
  const MAXIMUM_INPUT = maxInput || 500;
  const PLACEHOLDER = `Digite o texto aqui. Exemplo:

# Algum título
----

Você pode inserir equações matemáticas através do latex:
$2\\cdot x - 1 = 3 \\rightarrow x=2$

Para criar um paragráfo, deixe uma linha em branco.

No menu superior existem alguns outros atalhos que você pode utilizar.
`;

  // Handlers
  const handleCursorPosition = (e) => {
    setCursor({
      start: e.target.selectionStart,
      end: e.target.selectionEnd,
    });
  };
  const handleMarkdownUpdate = (val) => {
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
  const onChangeMarkdown = (e) => {
    handleMarkdownUpdate(e.target.value);
  };

  return (
    <Container>
      <Box height='100vh'>
        {/* Title */}
        <Box py={7}>
          <Typography align='center' variant='h4'>
            {name}
          </Typography>
        </Box>

        {/* Captions and Menu */}
        <Box my={1}>
          <Grid
            container
            spacing={GRID_SPACING}
            direction='row'
            justify='space-between'
            alignItems='center'
          >
            <Grid item xs={6} className={style.noPadding}>
              <Menu
                color='background.paper'
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
                variant='overline'
                align='center'
                display='block'
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
            direction='row'
            justify='space-between'
            alignItems='center'
          >
            {/* Textarea */}
            <Grid item xs={6}>
              <Paper elevation={6} color='background.paper'>
                <Box p={2} height={CARDS_SIZE}>
                  <TextArea
                    value={markdown}
                    onChange={onChangeMarkdown}
                    handleCursor={handleCursorPosition}
                    placeholder={PLACEHOLDER}
                    maxLength={MAXIMUM_INPUT}
                  />
                </Box>
              </Paper>
            </Grid>

            {/* Preview */}
            <Grid item xs={6}>
              <Paper elevation={6}>
                <Box p={2} height={CARDS_SIZE} alignItems='center'>
                  <ReactMarkdown
                    children={markdown}
                    remarkPlugins={[remarkMath, gfm]}
                    rehypePlugins={[rehypeRaw, rehypeKatex]}
                    transformImageUri={(uri) =>
                      uri.startsWith("http") ? uri : [imagePath, uri].join("/")
                    }
                    components={{
                      p: ({ node, ...props }) => (
                        <Typography
                          display='block'
                          align='justify'
                          noWrap
                          paragraph
                          component={"span"}
                          {...props}
                        />
                      ),
                      img: ({ node, ...props }) => (
                        <span>
                          <a href={props.src}>
                            <img
                              className={style["markdown-image"]}
                              style={borderImage}
                              alt='some mdimage'
                              {...props}
                            />
                          </a>
                          <Typography
                            paragraph
                            align='center'
                            variant='overline'
                          >
                            {props.alt}
                          </Typography>
                        </span>
                      ),
                      h1: ({ node, ...props }) => (
                        <Typography
                          paragraph
                          align='center'
                          variant='h4'
                          {...props}
                        />
                      ),
                      h2: ({ node, ...props }) => (
                        <Typography
                          paragraph
                          align='center'
                          variant='hGRID_SPACING'
                          {...props}
                        />
                      ),
                      h3: ({ node, ...props }) => (
                        <Typography
                          paragraph
                          align='center'
                          variant='h6'
                          {...props}
                        />
                      ),
                      h4: ({ node, ...props }) => (
                        <Typography paragraph variant='subtitle2' {...props} />
                      ),
                      h5: ({ node, ...props }) => (
                        <Typography paragraph variant='subtitle2' {...props} />
                      ),
                      h6: ({ node, ...props }) => (
                        <Typography paragraph variant='subtitle2' {...props} />
                      ),
                      hr: ({ node, ...props }) => (
                        <hr className={style["markdown-hr"]} {...props} />
                      ),
                    }}
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
