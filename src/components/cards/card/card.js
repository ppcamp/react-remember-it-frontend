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
 */
const Menu = (props) => {
  return (
    <Paper className={props.style}>
      <nav>
        <IconButton aria-label='upload picture' component='span'>
          <FormatSizeIcon />
        </IconButton>
        <IconButton aria-label='create a bold element' component='span'>
          <FormatBoldIcon />
        </IconButton>
        <IconButton aria-label='upload picture' component='span'>
          <FormatItalicIcon />
        </IconButton>
        |
        <IconButton aria-label='upload picture' component='span'>
          <FormatListBulletedIcon />
        </IconButton>
        <IconButton aria-label='upload picture' component='span'>
          <FormatListNumberedIcon />
        </IconButton>
        |
        <IconButton aria-label='upload picture' component='span'>
          <InsertLinkIcon />
        </IconButton>
        <IconButton aria-label='upload picture' component='span'>
          <InsertPhotoIcon />
        </IconButton>
        <IconButton aria-label='upload picture' component='span'>
          <FormatQuoteIcon />
        </IconButton>
        |
        <IconButton aria-label='upload picture' component='span'>
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

  const onChangeMarkdown = (e) => {
    setMarkdown(e.target.value);
  };

  // set watchers
  useEffect(() => {
    console.log(markdown);
  }, [markdown]);

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
          <Menu style={classes.paper} text={setMarkdown} />
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
