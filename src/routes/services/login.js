import { SignIn } from "pages/login/SignIn";
import { PasswordReset } from "pages/login/PasswordReset";
import { PasswordRequestReset } from "pages/login/PasswordRequestReset";

const routes = [
  {
    path: "/login",
    component: SignIn,
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
