import { CardCreatePage } from "pages/card";
import { CardEditPage } from "pages/card/Edit";
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
];

export const cardRoutes = routes;
