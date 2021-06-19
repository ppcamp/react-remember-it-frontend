import { SignIn } from "pages/SignIn";
import { PasswordReset } from "pages/PasswordReset";

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
    path: "/login/new",
    component: SignIn,
  },
];

export const loginRoutes = routes;
