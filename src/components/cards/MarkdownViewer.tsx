import React from "react";
// Markdown
import ReactMarkdown from "react-markdown";
// plugin: support other functionalities (like tables)
import gfm from "remark-gfm";
// plugin: support html native
import rehypeRaw from "rehype-raw";
// plugin: support to math
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Typography, useTheme } from "@material-ui/core";

// css import
import style from "./MarkdownViewer.module.css";

type MarkdownViewerProps = {
  markdown: string;
  imagePath: string;
};

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({
  markdown,
  imagePath,
}) => {
  // Theming
  const theme = useTheme();
  const borderImage = {
    border:
      theme.palette.type === "dark" ? "1px #555 solid" : "1px #ebebeb solid",
  };

  return (
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
            display="block"
            align="center"
            noWrap
            paragraph
            component={"span"}
          >
            {props.children}
          </Typography>
        ),
        img: ({ node, ...props }) => (
          <span>
            {/* <a href={props.src as string}> */}
            <img
              className={style["markdown-image"]}
              style={borderImage}
              alt="some mdimage"
              {...props}
            />
            {/* </a> */}
            <Typography paragraph align="center" variant="overline">
              {props.alt as string}
            </Typography>
          </span>
        ),
        h1: ({ ...props }) => (
          <Typography paragraph align="center" variant="h4">
            {props.children}
          </Typography>
        ),
        h2: ({ node, ...props }) => (
          <Typography paragraph align="center" variant="h5">
            {props.children}
          </Typography>
        ),
        h3: ({ node, ...props }) => (
          <Typography paragraph align="center" variant="h6">
            {props.children}
          </Typography>
        ),
        h4: ({ node, ...props }) => (
          <Typography paragraph variant="subtitle2">
            {props.children}
          </Typography>
        ),
        h5: ({ node, ...props }) => (
          <Typography paragraph variant="subtitle2">
            {props.children}
          </Typography>
        ),
        h6: ({ node, ...props }) => (
          <Typography paragraph variant="subtitle2">
            {props.children}
          </Typography>
        ),
        hr: ({ node, ...props }) => <hr className={style["markdown-hr"]} />,
      }}
    />
  );
};
