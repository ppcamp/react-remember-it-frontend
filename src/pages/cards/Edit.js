import React from "react";
import { useParams } from "react-router-dom";

export const CardEdit = (props) => {
  const { id } = useParams();
  return <div>Edição do card #{id}</div>;
};
