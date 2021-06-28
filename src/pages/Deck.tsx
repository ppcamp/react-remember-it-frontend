import React from "react";
import { Box, Typography } from "@material-ui/core";
import { MenuAppBar } from "components/topbar";
import { useParams } from "react-router";
import { RouteParams } from "scripts/shared-types";
import { useSelector } from "react-redux";
import { RootState } from "store";

export const DeckPage = () => {
  const deck = useSelector((state: RootState) => state.deck);
  const { id } = useParams<RouteParams>();

  return (
    <div>
      <MenuAppBar />

      <Box m={4} py={4}>
        <Typography variant="h4" paragraph>
          {deck.title}
        </Typography>
        <Typography variant="body1" paragraph>
          {deck.description}
        </Typography>
      </Box>
      <Box p={4}>
        <Typography variant="h6">Cartões</Typography>
      </Box>
    </div>
  );
};
