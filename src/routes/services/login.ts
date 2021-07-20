import { SignIn } from "pages/login";
import { SignUp } from "pages/login/SignUp";
import { PasswordReset } from "pages/login/recover-password/[id]";
import { PasswordRequestReset } from "pages/login/recover-password";
import { RouteObject } from "scripts/types/shared-types";

const routes: RouteObject[] = [
  {
    path: "/login",
    component: SignIn,
  },
  {
    path: "/login/signup",
    component: SignUp,
  },
  {
    path: "/login/recover-password/:id",
    component: PasswordReset,
  },
  {
    path: "/login/recover-password",
    component: PasswordRequestReset,
  },
];

export const loginRoutes = routes;
