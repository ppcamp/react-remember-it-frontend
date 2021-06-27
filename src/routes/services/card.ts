import { Dashboard } from "@material-ui/icons";
import { CardCreatePage } from "pages/card";
import { CardEditPage } from "pages/card/Edit";
import { RouteObject } from "scripts/shared-types";

const routes: RouteObject[] = [
  {
    path: "/card",
    component: CardCreatePage,
  },
  {
    path: "/card/:id",
    component: CardEditPage,
  },
  {
    path: "/dashboard",
    component: Dashboard,
  },
];

export const cardRoutes = routes;
