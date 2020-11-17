import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResponseChart } from "@/types";

export type LoaderAction = PayloadAction<State>;

type State = {
  loading: boolean;
  data: ResponseChart[];
  error: string | null;
};

export const initialState: State = {
  loading: false,
  data: [],
  error: null,
};

export const fetchStart = createAction("loader/fetch_start");
export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    pending: (state) => ({ ...state, loading: true }),
    rejected: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
    fulfilled: (state, action) => ({
      ...state,
      loading: false,
      data: action.payload,
    }),
  },
});

export const { reducer, actions } = loaderSlice;
