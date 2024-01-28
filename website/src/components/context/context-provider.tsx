import React, { useReducer } from "react";

import type { Action } from "./actions";
import type { State } from "./reducer";

import { AppContext } from "./context";
import { initialState, reducer } from "./reducer";

interface Props {
  children: React.ReactNode;
}

export const ContextProvider: React.FunctionComponent<Props> = (
  props: Props
): React.JSX.Element => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState
  );

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};
