import React from "react";

import { IconButton, Box, Paper } from "@material-ui/core";

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

export default Menu;
