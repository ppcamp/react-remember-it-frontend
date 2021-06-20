import { SignIn } from "pages/login/SignIn";
import { SignUp } from "pages/login/SignUp";
import { PasswordReset } from "pages/login/PasswordReset";
import { PasswordRequestReset } from "pages/login/PasswordRequestReset";

const routes = [
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
