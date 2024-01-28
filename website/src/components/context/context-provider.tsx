import React, { useState } from "react";
import { State, Context, defaultState } from "./context";

interface Props {
  children: React.ReactNode;
}

export const ContextProvider: React.FunctionComponent<Props> = (
  props: Props
): React.JSX.Element => {
  const [state, setState] = useState(defaultState);

  const updateState = (newState: Partial<State>) => {
    console.log("updating state:");
    console.log(state);
    console.log("new state");
    console.log(newState);
    setState((state) => ({ ...state, ...newState }));
  };

  return (
    <Context.Provider value={{ ...state, updateState }}>
      {props.children}
    </Context.Provider>
  );
};
