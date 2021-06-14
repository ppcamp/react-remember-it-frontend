import React from "react";
import { useParams } from "react-router-dom";

export const Deck = (props) => {
  const { id } = useParams();
  return <div>Deck #{id}</div>;
};
