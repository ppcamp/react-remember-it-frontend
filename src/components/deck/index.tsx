import React from "react";
import { useParams } from "react-router-dom";
import { RouteParams } from "scripts/shared-types";

export const Deck = () => {
  const { id } = useParams<RouteParams>();
  return <div>Deck #{id}</div>;
};
