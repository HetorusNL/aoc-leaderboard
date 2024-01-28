import React from "react";

export interface State {
  edition?: number;
  loading?: boolean;
  updateState: (newState: Partial<State>) => void;
}

export const defaultState: State = {
  edition: undefined,
  loading: false,
  updateState: (newState?: Partial<State>) => {},
};

export const Context = React.createContext<State>(defaultState);
