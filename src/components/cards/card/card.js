import React, { useEffect, useState } from "react";
// Material components
import {
  Grid,
  Paper,
  Container,
  Typography,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// Icons
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatSizeIcon from "@material-ui/icons/FormatSize";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import InsertLinkIcon from "@material-ui/icons/InsertLink";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import TranslateIcon from "@material-ui/icons/Translate";

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
import "./card.css";

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
  views: {
    margin: theme.spacing(3),
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
 * Menu
 *
 * TODO: missing image upload
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
  return (
    <Paper className={props.style}>
      <nav>
        <IconButton
          aria-label='add a title format'
          component='span'
          onClick={addTitle}
        >
          <FormatSizeIcon />
        </IconButton>
        <IconButton
          aria-label='create a bold element'
          component='span'
          onClick={addBold}
        >
          <FormatBoldIcon />
        </IconButton>
        <IconButton
          aria-label='create a italic field'
          component='span'
          onClick={addItalic}
        >
          <FormatItalicIcon />
        </IconButton>
        |
        <IconButton
          aria-label='create a bullet list'
          component='span'
          onClick={addBulletList}
        >
          <FormatListBulletedIcon />
        </IconButton>
        <IconButton
          aria-label='create a numbered list'
          component='span'
          onClick={addNumeratedList}
        >
          <FormatListNumberedIcon />
        </IconButton>
        |
        <IconButton
          aria-label='insert a link'
          component='span'
          onClick={addHyperlink}
        >
          <InsertLinkIcon />
        </IconButton>
        <IconButton
          aria-label='upload picture'
          component='span'
          onClick={addHyperlink}
        >
          <InsertPhotoIcon />
        </IconButton>
        <IconButton
          aria-label='create a quotation'
          component='span'
          onClick={addCitation}
        >
          <FormatQuoteIcon />
        </IconButton>
        |
        <IconButton
          aria-label='create a space to asian chars'
          component='span'
          onClick={addJapanese}
        >
          <TranslateIcon />
        </IconButton>
      </nav>
    </Paper>
  );
};

/**
 * Card view
 */
export const Card = (props) => {
  const classes = useStyles();
  const [markdown, setMarkdown] = useState(
    `The lift coefficient ($C_L$) is a dimensionless coefficient.
    <p lang="ja"><ruby><rb>水</rb><rt>みず</rt><rb>芝</rb><rt>し</rt><rb>居</rb><rt>ばい</rt></ruby></p>`
  );

  const [cursorPosition, setCursorPosition] = useState({ start: 0, end: 0 });
  // const [selectFlag, setSelectFlag] = useState(0);

  const onChangeMarkdown = (e) => {
    setMarkdown(e.target.value);
  };
  const handleCursorPosition = (e) => {
    setCursorPosition({
      start: e.target.selectionStart,
      end: e.target.selectionEnd,
    });
  };

  // set watchers
  useEffect(() => {
    // console.log(markdown);
  }, [markdown]);
  useEffect(() => {
    // console.log("Cursor: ", cursorPosition);
  }, [cursorPosition]);

  return (
    <Container>
      <Grid
        container
        spacing={5}
        direction='row'
        justify='space-between'
        alignItems='center'
        style={{ minHeight: "100vh" }}
      >
        {/* Title */}
        <Grid item xs={12}>
          <Typography align='center' variant='h4'>
            Frente
          </Typography>
        </Grid>

        {/* Subcaptions */}
        <Grid item xs={6} className={classes.noPadding}>
          <Menu
            style={classes.paper}
            value={markdown}
            update={setMarkdown}
            cursor={cursorPosition}
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
            <div className={classes.views}>
              <textarea
                className={classes.textarea}
                value={markdown}
                onChange={onChangeMarkdown}
                rows={20}
                onKeyDown={handleCursorPosition}
                onClick={handleCursorPosition}
              />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={`${classes.paper} ${classes.container}`}>
            <div className={classes.views}>
              <ReactMarkdown
                children={markdown}
                remarkPlugins={[remarkMath, gfm]}
                rehypePlugins={[rehypeRaw, rehypeKatex]}
              />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
