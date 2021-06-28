import React from "react";
import { Box, Typography } from "@material-ui/core";
import { MenuAppBar } from "components/topbar";
import { useParams } from "react-router";
import { RouteParams } from "scripts/shared-types";

export const DeckPage = () => {
  const title = "Deck title";
  const { id } = useParams<RouteParams>();
  const description = `Deck #${id}`;

  return (
    <div>
      <MenuAppBar />

      <Box m={4} py={4}>
        <Typography variant="h4" paragraph>
          {title}
        </Typography>
        <Typography variant="body1" paragraph>
          {description}
        </Typography>
      </Box>
      <Box p={4}>
        <Typography variant="h6">Cartões</Typography>
      </Box>
    </div>
  );
};
