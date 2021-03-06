import { CardCreatePage } from "pages/[deck]/card";
import { CardEditPage } from "pages/[deck]/card/[id]";
import { GamingPage } from "pages/remember-it";
import { RouteObject } from "scripts/types/router";

const routes: RouteObject[] = [
  {
    path: "/:deck/card",
    component: CardCreatePage,
  },
  {
    path: "/:deck/card/:id",
    component: CardEditPage,
  },
  {
    path: "/remember-it",
    component: GamingPage,
  },
];

export const cardRoutes = routes;
