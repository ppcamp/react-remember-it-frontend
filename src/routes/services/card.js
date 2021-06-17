import { CardCreate } from "pages/cards/Create";
import { CardEdit } from "pages/cards/Edit";

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
