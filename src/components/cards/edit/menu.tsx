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
 * Holds the cursor position
 */
export type Cursor = {
  start: number;
  end: number;
};

export type History = {
  undo: string;
  redo: string;
};

type MenuProps = {
  value: string;
  cursor: Cursor;
  history: History;
  style?: string;
  color: string;
  update: Function;
  redo: Function;
  undo: Function;
};

/**
 * Menu
 *
 * TODO: missing image upload function to server
 */
const Menu: React.FC<MenuProps> = ({
  value,
  cursor,
  update,
  color,
  redo,
  undo,
  history,
  style,
}) => {
  /**
   * Adds a bold in the selected text or create a the keyword inplace
   */
  const addBold = () => {
    const before = value.slice(0, cursor.start);
    const text = value.slice(cursor.start, cursor.end);
    const after = value.slice(cursor.end);
    let result = before;
    result += text.length ? `**${text}**` : "**negrito**";
    result += after;
    update(result);
  };

  /**
   * Adds a italic in the selected text or create a the keyword inplace
   */
  const addItalic = () => {
    const before = value.slice(0, cursor.start);
    const text = value.slice(cursor.start, cursor.end);
    const after = value.slice(cursor.end);
    let result = before;
    result += text.length ? `*${text}*` : "*itálico*";
    result += after;
    update(result);
  };

  /**
   * Adds title in the selected text or create a the keyword inplace
   */
  const addTitle = () => {
    const before = value.slice(0, cursor.start);
    const text = value.slice(cursor.start, cursor.end);
    const after = value.slice(cursor.end);
    let result = before;
    result += text.length
      ? text[0] === "#"
        ? `#${text}`
        : `# ${text}`
      : "# título";
    result += after;
    update(result);
  };

  /**
   * Adds a bullet list in the selected text or create a sample inplace
   */
  const addBulletList = () => {
    const before = value.slice(0, cursor.start);
    const text = value.slice(cursor.start, cursor.end);
    const after = value.slice(cursor.end);
    let result = before;

    if (text.length) {
      const lines = text.split("\n").map((val) => "* " + val);
      result += lines.join("\n");
    } else {
      result += "\n* item";
    }
    result += after;
    update(result);
  };

  /**
   * Adds a numerated list in the selected text or create a sample inplace
   */
  const addNumeratedList = () => {
    const before = value.slice(0, cursor.start);
    const text = value.slice(cursor.start, cursor.end);
    const after = value.slice(cursor.end);
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
    update(result);
  };

  /**
   * Adds a hyperlink in the selected text or create a the keyword inplace
   */
  const addHyperlink = () => {
    const before = value.slice(0, cursor.start);
    const text = value.slice(cursor.start, cursor.end);
    const after = value.slice(cursor.end);
    let result = before;
    result += text.length
      ? `[${text}](http://www.google.com)`
      : "[Título para o link](http://www.google.com)";
    result += after;
    update(result);
  };

  /**
   * Adds an image inplace
   */
  const addImage = () => {
    const before = value.slice(0, cursor.start);
    const text = value.slice(cursor.start, cursor.end);
    const after = value.slice(cursor.end);
    let result = before + text;
    result += `![descrição da imagem](link)`;
    result += after;
    update(result);
  };

  /**
   * Adds a single line inplace
   */
  const addLine = () => {
    const before = value.slice(0, cursor.start);
    const text = value.slice(cursor.start, cursor.end);
    const after = value.slice(cursor.end);
    let result = before + text + "****\n" + after;
    update(result);
  };

  /**
   * Adds a citation in the selected text or create a the keyword inplace
   */
  const addCitation = () => {
    const before = value.slice(0, cursor.start);
    const text = value.slice(cursor.start, cursor.end);
    const after = value.slice(cursor.end);
    let result = before;
    result += text.length ? `\n> ${text}` : "> citation";
    result += after;
    update(result);
  };

  /**
   * Adds a japanese in the selected text or create a the keyword inplace
   */
  const addJapanese = () => {
    const before = value.slice(0, cursor.start);
    const text = value.slice(cursor.start, cursor.end);
    const after = value.slice(cursor.end);
    let result = before;
    result += text.length
      ? `<ruby> <rb>${text}</rb><rt>?</rt> </ruby>`
      : "<ruby> <rb>日</rb><rt>にっ</rt> <rb>本</rb><rt>ぽん</rt> <rb>語</rb><rt>ご</rt> </ruby>";
    result += after;
    update(result);
  };

  /**********************
   * Renders the element
   *********************/

  let redoUndoSec = null;
  if (redo !== undefined && undo !== undefined) {
    redoUndoSec = (
      <Box display="inline">
        <IconButton
          disabled={!history.undo.length}
          aria-label="undo"
          component="span"
          onClick={() => undo()}
        >
          <Undo />
        </IconButton>
        <IconButton
          disabled={!history.redo.length}
          aria-label="redo"
          component="span"
          onClick={() => redo()}
        >
          <Redo />
        </IconButton>
        |
      </Box>
    );
  }

  return (
    <Paper elevation={6} className={style}>
      <nav>
        {redoUndoSec}
        <IconButton
          aria-label="add a title format"
          component="span"
          onClick={addTitle}
        >
          <FormatSize fontSize="small" />
        </IconButton>
        <IconButton
          aria-label="create a bold element"
          component="span"
          onClick={addBold}
        >
          <FormatBold fontSize="small" />
        </IconButton>
        <IconButton
          aria-label="create a italic field"
          component="span"
          onClick={addItalic}
        >
          <FormatItalic fontSize="small" />
        </IconButton>
        |
        <IconButton
          aria-label="create a bullet list"
          component="span"
          onClick={addBulletList}
        >
          <FormatListBulleted fontSize="small" />
        </IconButton>
        <IconButton
          aria-label="create a numbered list"
          component="span"
          onClick={addNumeratedList}
        >
          <FormatListNumbered fontSize="small" />
        </IconButton>
        |
        <IconButton
          aria-label="insert a link"
          component="span"
          onClick={addHyperlink}
        >
          <InsertLink fontSize="small" />
        </IconButton>
        <IconButton
          aria-label="upload picture"
          component="span"
          onClick={addImage}
        >
          <InsertPhoto fontSize="small" />
        </IconButton>
        <IconButton
          aria-label="create a quotation"
          component="span"
          onClick={addCitation}
        >
          <FormatQuote fontSize="small" />
        </IconButton>
        <IconButton
          aria-label="create a single line"
          component="span"
          onClick={addLine}
        >
          <HorizontalSplit fontSize="small" />
        </IconButton>
        |
        <IconButton
          aria-label="create a space to asian chars"
          component="span"
          onClick={addJapanese}
        >
          <Translate fontSize="small" />
        </IconButton>
      </nav>
    </Paper>
  );
};

export default Menu;
