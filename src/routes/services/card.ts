import { CardCreatePage } from "pages/card";
import { CardEditPage } from "pages/card/Edit";
import { GamingPage } from "pages/Gaming";
import { RouteObject } from "scripts/shared-types";

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
