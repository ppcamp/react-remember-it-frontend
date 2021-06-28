import React from "react";

export type RouteParams = {
  id: string;
  deck?: string;
};

export type RouteObject = {
  path: string;
  component: (props: any) => JSX.Element;
};
