import React from "react";
import { useParams } from "react-router";
import { RouteParams } from "scripts/shared-types";

export const DeckPage = () => {
  const { id } = useParams<RouteParams>();
  return <div>Deck #{id}</div>;
};
