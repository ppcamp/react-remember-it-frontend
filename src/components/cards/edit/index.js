import React, { useState } from "react";
// Material components
import { Grid, Paper, Container, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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

/**
 * Styles to this page
 */
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 4,
  },
  paper: {
    color: theme.palette.text.secondary,
    padding: theme.spacing(1),
  },
  container: {
    height: 400,
  },
  textarea: {
    border: 0,
    minWidth: "100%",
    minHeight: "100%",
    outline: "none",
    resize: "none",
  },
  noPadding: {
    padding: 0,
  },
}));

/**
 *
 * Card creation/edit view
 *
 * TODO: handle elements trespassing the view panel
 */
export const CardEdit = (props) => {
  const classes = useStyles();

  const [markdown, setMarkdown] = useState("");
  const [history, setHistory] = useState({ undo: "", redo: "" });
  const [cursorPosition, setCursorPosition] = useState({ start: 0, end: 0 });

  const handleMarkdownUpdate = (val) => {
    // every time that changes the markdown, will update history
    const hist = { ...history };
    hist.undo = markdown;
    hist.redo = "";
    setHistory(hist);
    setMarkdown(val);
  };
  const handleUndo = () => {
    const hist = { ...history };
    const undo = hist.undo;
    hist.redo = markdown;
    hist.undo = "";
    setHistory(hist);
    setMarkdown(undo);
  };
  const handleRedo = () => {
    const hist = { ...history };
    const redo = hist.redo;
    hist.undo = markdown;
    hist.redo = "";
    setHistory(hist);
    setMarkdown(redo);
  };
  const handleCursorPosition = (e) => {
    setCursorPosition({
      start: e.target.selectionStart,
      end: e.target.selectionEnd,
    });
  };

  const onChangeMarkdown = (e) => {
    handleMarkdownUpdate(e.target.value);
  };

  return (
    <Container>
      <Grid
        container
        spacing={5}
        direction='row'
        justify='space-between'
        alignItems='center'
        css={{ minHeight: "100vh" }}
      >
        {/* Title */}
        <Grid item xs={12}>
          <Typography align='center' variant='h4'>
            {props.name}
          </Typography>
        </Grid>

        {/* Captions and Menu */}
        <Grid item xs={6} className={classes.noPadding}>
          <Menu
            style={classes.paper}
            value={markdown}
            update={handleMarkdownUpdate}
            cursor={cursorPosition}
            history={history}
            undo={handleUndo}
            redo={handleRedo}
          />
        </Grid>
        <Grid item xs={6} className={classes.noPadding}>
          <Typography
            variant='overline'
            align='center'
            display='block'
            gutterBottom
          >
            Pré visualização
          </Typography>
        </Grid>

        {/* Elements */}
        <Grid item xs={6}>
          <Paper className={`${classes.paper} ${classes.container}`}>
            <Box m={3}>
              <textarea
                className={classes.textarea}
                value={markdown}
                onChange={onChangeMarkdown}
                rows={20}
                onKeyDown={handleCursorPosition}
                onClick={handleCursorPosition}
                placeholder='Insira o texto aqui...'
                maxLength='500'
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={`${classes.paper} ${classes.container}`}>
            <Box
              m={3}
              id='right_view'
              alignItems='center'
              p={1}
              css={{ height: "inherit" }}
            >
              <ReactMarkdown
                children={markdown}
                remarkPlugins={[remarkMath, gfm]}
                rehypePlugins={[rehypeRaw, rehypeKatex]}
                transformImageUri={(uri) =>
                  uri.startsWith("http")
                    ? uri
                    : `${process.env.REACT_APP_IMAGE_BASE_URL}/${uri}`
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
                          alt='some mdimage'
                          {...props}
                        />
                      </a>
                      <Typography paragraph align='center' variant='overline'>
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
                      variant='h5'
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
    </Container>
  );
};
