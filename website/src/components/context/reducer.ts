import type { Action } from "./actions";

export type State = {
  edition?: number;
  initialEdition: number;
  latestEdition?: number;
  loading?: boolean;
};

export const initialState: State = {
  edition: undefined,
  initialEdition: 2015,
  latestEdition: undefined,
  loading: false,
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_EDITION":
      const edition = action.payload.edition;
      return { ...state, edition };
    case "SET_LATEST_EDITION":
      const latestEdition = action.payload.edition;
      return { ...state, latestEdition };
    case "SET_LOADING":
      const loading = action.payload.loading;
      return { ...state, loading };
    default:
      return state;
  }
};
