import { useTheme } from "@material-ui/core";
import React from "react";
import css from "./index.module.css";

type TextAreaProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  maxLength: number;
  rows?: number;
  className?: string;
};
export const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  placeholder,
  maxLength,
  rows,
  className,
  // handleCursor,
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
      // onKeyDown={handleCursor}
      // onClick={handleCursor}
      placeholder={placeholder}
      maxLength={maxLength || 500}
    />
  );
};
