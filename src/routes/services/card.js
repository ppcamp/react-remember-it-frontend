import { CardCreatePage } from "pages/card";
import { CardEditPage } from "pages/card/Edit";

const routes = [
  {
    path: "/card",
    component: CardCreatePage,
  },
  {
    path: "/card/:id",
    component: CardEditPage,
  },
];

export const cardRoutes = routes;
