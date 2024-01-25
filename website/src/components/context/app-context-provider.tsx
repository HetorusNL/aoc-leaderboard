import React, { useState } from "react";
import { AppState, AppContext, defaultState } from "./app-context";

interface Props {
  children: React.ReactNode;
}

export const AppContextProvider: React.FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  const [state, setState] = useState(defaultState);

  const updateState = (newState: Partial<AppState>) => {
    console.log("updating state:");
    console.log(state);
    console.log("new state");
    console.log(newState);
    setState({ ...state, ...newState });
  };

  return (
    <AppContext.Provider value={{ ...state, updateState }}>
      {props.children}
    </AppContext.Provider>
  );
};
