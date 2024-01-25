import React from "react";

export interface AppState {
  edition?: number;
  loading?: boolean;
  updateState: (newState: Partial<AppState>) => void;
}

export const defaultState: AppState = {
  edition: undefined,
  loading: false,
  updateState: (newState?: Partial<AppState>) => {},
};

export const AppContext = React.createContext<AppState>(defaultState);
