import { SignIn } from "pages/login/SignIn";
import { PasswordReset } from "pages/login/PasswordReset";

const routes = [
  {
    path: "/login",
    component: SignIn,
  },
  {
    path: "/login/recover-password",
    component: PasswordReset,
  },
  {
    path: "/login/recover-password/:id",
    component: PasswordReset,
  },
];

export const loginRoutes = routes;
