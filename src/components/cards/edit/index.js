import React, { useState } from "react";
// Material components
import {
  Grid,
  Paper,
  Container,
  Typography,
  IconButton,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// Icons
import {
  FormatBold,
  FormatItalic,
  FormatSize,
  FormatListBulleted,
  FormatListNumbered,
  InsertLink,
  FormatQuote,
  InsertPhoto,
  Translate,
  Undo,
  Redo,
  HorizontalSplit,
} from "@material-ui/icons";

// Markdown
import ReactMarkdown from "react-markdown";
// plugin: support other functionalities (like tables)
import gfm from "remark-gfm";
// plugin: support html native
import rehypeRaw from "rehype-raw";
// plugin: support to math
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "./katex/katex.css";

// japanese formatting
import "./index.css";

/**
 * Menu
 *
 * TODO: missing image upload function to server
 */
const Menu = (props) => {
  /**
   * Adds a bold in the selected text or create a the keyword inplace
   */
  const addBold = () => {
    const before = props.value.slice(0, props.cursor.start);
    const text = props.value.slice(props.cursor.start, props.cursor.end);
    const after = props.value.slice(props.cursor.end);
    let result = before;
    result += text.length ? `**${text}**` : "**negrito**";
    result += after;
    props.update(result);
  };

  /**
   * Adds a italic in the selected text or create a the keyword inplace
   */
  const addItalic = () => {
    const before = props.value.slice(0, props.cursor.start);
    const text = props.value.slice(props.cursor.start, props.cursor.end);
    const after = props.value.slice(props.cursor.end);
    let result = before;
    result += text.length ? `*${text}*` : "*itálico*";
    result += after;
    props.update(result);
  };

  /**
   * Adds title in the selected text or create a the keyword inplace
   */
  const addTitle = () => {
    const before = props.value.slice(0, props.cursor.start);
    const text = props.value.slice(props.cursor.start, props.cursor.end);
    const after = props.value.slice(props.cursor.end);
    let result = before;
    result += text.length
      ? text[0] === "#"
        ? `#${text}`
        : `# ${text}`
      : "# título";
    result += after;
    props.update(result);
  };

  /**
   * Adds a bullet list in the selected text or create a sample inplace
   */
  const addBulletList = () => {
    const before = props.value.slice(0, props.cursor.start);
    const text = props.value.slice(props.cursor.start, props.cursor.end);
    const after = props.value.slice(props.cursor.end);
    let result = before;

    if (text.length) {
      const lines = text.split("\n").map((val) => "* " + val);
      result += lines.join("\n");
    } else {
      result += "\n* item";
    }
    result += after;
    props.update(result);
  };

  /**
   * Adds a numerated list in the selected text or create a sample inplace
   */
  const addNumeratedList = () => {
    const before = props.value.slice(0, props.cursor.start);
    const text = props.value.slice(props.cursor.start, props.cursor.end);
    const after = props.value.slice(props.cursor.end);
    let result = before;

    if (text.length) {
      const lines = text
        .split("\n")
        .map((val, index) => `${index + 1}. ` + val);
      result += lines.join("\n");
    } else {
      result += "\n1. item";
    }
    result += after;
    props.update(result);
  };

  /**
   * Adds a hyperlink in the selected text or create a the keyword inplace
   */
  const addHyperlink = () => {
    const before = props.value.slice(0, props.cursor.start);
    const text = props.value.slice(props.cursor.start, props.cursor.end);
    const after = props.value.slice(props.cursor.end);
    let result = before;
    result += text.length
      ? `[${text}](http://www.google.com)`
      : "[Título para o link](http://www.google.com)";
    result += after;
    props.update(result);
  };

  /**
   * Adds an image inplace
   */
  const addImage = () => {
    const before = props.value.slice(0, props.cursor.start);
    const text = props.value.slice(props.cursor.start, props.cursor.end);
    const after = props.value.slice(props.cursor.end);
    let result = before + text;
    result += `![descrição da imagem](link)`;
    result += after;
    props.update(result);
  };

  /**
   * Adds a single line inplace
   */
  const addLine = () => {
    const before = props.value.slice(0, props.cursor.start);
    const text = props.value.slice(props.cursor.start, props.cursor.end);
    const after = props.value.slice(props.cursor.end);
    let result = before + text + "****\n" + after;
    props.update(result);
  };

  /**
   * Adds a citation in the selected text or create a the keyword inplace
   */
  const addCitation = () => {
    const before = props.value.slice(0, props.cursor.start);
    const text = props.value.slice(props.cursor.start, props.cursor.end);
    const after = props.value.slice(props.cursor.end);
    let result = before;
    result += text.length ? `\n> ${text}` : "> citation";
    result += after;
    props.update(result);
  };

  /**
   * Adds a japanese in the selected text or create a the keyword inplace
   */
  const addJapanese = () => {
    const before = props.value.slice(0, props.cursor.start);
    const text = props.value.slice(props.cursor.start, props.cursor.end);
    const after = props.value.slice(props.cursor.end);
    let result = before;
    result += text.length
      ? `<ruby> <rb>${text}</rb><rt>?</rt> </ruby>`
      : "<ruby> <rb>日</rb><rt>にっ</rt> <rb>本</rb><rt>ぽん</rt> <rb>語</rb><rt>ご</rt> </ruby>";
    result += after;
    props.update(result);
  };

  /**********************
   * Renders the element
   *********************/

  let redoUndoSec = null;
  if (props.redo !== undefined && props.undo !== undefined) {
    redoUndoSec = (
      <Box display='inline'>
        <IconButton
          disabled={!props.history.undo.length}
          aria-label='undo'
          component='span'
          onClick={() => props.undo()}
        >
          <Undo />
        </IconButton>
        <IconButton
          disabled={!props.history.redo.length}
          aria-label='redo'
          component='span'
          onClick={() => props.redo()}
        >
          <Redo />
        </IconButton>
        |
      </Box>
    );
  }

  return (
    <Paper className={props.style}>
      <nav>
        {redoUndoSec}
        <IconButton
          aria-label='add a title format'
          component='span'
          onClick={addTitle}
        >
          <FormatSize fontSize='small' />
        </IconButton>
        <IconButton
          aria-label='create a bold element'
          component='span'
          onClick={addBold}
        >
          <FormatBold fontSize='small' />
        </IconButton>
        <IconButton
          aria-label='create a italic field'
          component='span'
          onClick={addItalic}
        >
          <FormatItalic fontSize='small' />
        </IconButton>
        |
        <IconButton
          aria-label='create a bullet list'
          component='span'
          onClick={addBulletList}
        >
          <FormatListBulleted fontSize='small' />
        </IconButton>
        <IconButton
          aria-label='create a numbered list'
          component='span'
          onClick={addNumeratedList}
        >
          <FormatListNumbered fontSize='small' />
        </IconButton>
        |
        <IconButton
          aria-label='insert a link'
          component='span'
          onClick={addHyperlink}
        >
          <InsertLink fontSize='small' />
        </IconButton>
        <IconButton
          aria-label='upload picture'
          component='span'
          onClick={addImage}
        >
          <InsertPhoto fontSize='small' />
        </IconButton>
        <IconButton
          aria-label='create a quotation'
          component='span'
          onClick={addCitation}
        >
          <FormatQuote fontSize='small' />
        </IconButton>
        <IconButton
          aria-label='create a single line'
          component='span'
          onClick={addLine}
        >
          <HorizontalSplit fontSize='small' />
        </IconButton>
        |
        <IconButton
          aria-label='create a space to asian chars'
          component='span'
          onClick={addJapanese}
        >
          <Translate fontSize='small' />
        </IconButton>
      </nav>
    </Paper>
  );
};

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
                          className='markdown-image'
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
                    <hr className='markdown-hr' {...props} />
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
