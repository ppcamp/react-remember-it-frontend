import React from "react";
import { Typography, Link } from "@material-ui/core";

export const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href={process.env.REACT_APP_SITE_LINK}>
        {process.env.REACT_APP_SITE_NAME}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
