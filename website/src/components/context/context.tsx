import React from "react";

import type { State } from "./reducer";

import { Action } from "./actions";

type Context = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

export const AppContext = React.createContext<Context>({} as Context);
