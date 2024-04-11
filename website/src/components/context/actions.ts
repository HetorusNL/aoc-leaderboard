export const setEdition = (
  edition: number | undefined
): {
  type: "SET_EDITION";
  payload: {
    edition: number | undefined;
  };
} => ({
  type: "SET_EDITION",
  payload: { edition },
});

export const setLatestEdition = (
  edition: number | undefined
): {
  type: "SET_LATEST_EDITION";
  payload: {
    edition: number | undefined;
  };
} => ({
  type: "SET_LATEST_EDITION",
  payload: { edition },
});

export const setLoading = (
  loading: boolean
): {
  type: "SET_LOADING";
  payload: {
    loading: boolean;
  };
} => ({
  type: "SET_LOADING",
  payload: { loading },
});

export type Action =
  | ReturnType<typeof setEdition>
  | ReturnType<typeof setLatestEdition>
  | ReturnType<typeof setLoading>;
