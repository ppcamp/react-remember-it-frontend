import { Color } from "@material-ui/lab";

export type RouteParams = {
  id: string;
  /* Deck can, or not, exist into a query */
  deck?: string;
};

export type RouteObject = {
  path: string;
  component: (props: any) => JSX.Element;
};

export type ErrorType = {
  show: boolean;
  type: Color;
  message: string;
};
