import React from "react";
import { Grid, Paper, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ReactMarkdown from "react-markdown";
// plugin: support other functionalities (like tables)
import gfm from "remark-gfm";
// plugin: support to math
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

/**
 * Styles to this page
 */
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    height: 500,
  },
}));

/**
 * Card view
 */
export const Card = (props) => {
  const classes = useStyles();
  const markdown = `Here is some JavaScript code:

  ~~~js
  console.log('It works!')
  ~~~
  `;

  return (
    <Container>
      <Grid
        container
        spacing={3}
        direction='row'
        justify='space-around'
        alignItems='center'
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography align='center' variant='h4'>
              Pergunta
              <hr />
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography align='center' variant='h4'>
              Resposta
            </Typography>
            <hr />
            <ReactMarkdown
              children={markdown}
              remarkPlugins={[remarkMath, gfm]}
              rehypePlugins={[rehypeKatex]}
            />
            test
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
