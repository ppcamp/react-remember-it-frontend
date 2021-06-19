import { useTheme } from "@material-ui/core";
import React from "react";
import css from "./textarea.module.css";

export const TextArea = ({
  value,
  onChange,
  handleCursor,
  placeholder,
  maxLength,
  rows,
  className,
}) => {
  const { palette } = useTheme();
  const textAreaStyling = {
    backgroundColor: palette.background.paper,
    color: palette.text.primary,
  };

  return (
    <textarea
      style={textAreaStyling}
      className={className || css.textarea}
      value={value}
      onChange={onChange}
      rows={rows || 20}
      onKeyDown={handleCursor}
      onClick={handleCursor}
      placeholder={placeholder}
      maxLength={maxLength || 500}
    />
  );
};
