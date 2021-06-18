import { CardCreate } from "pages/card";
import { CardEdit } from "pages/card/edit";

const routes = [
  {
    path: "/card",
    component: CardCreate,
  },
  {
    path: "/card/:id",
    component: CardEdit,
  },
];

export const cardRoutes = routes;
