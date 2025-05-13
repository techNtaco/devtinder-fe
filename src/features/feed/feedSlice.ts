import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeedUser } from "../../types/feed"; // renamed from feedTypes for consistency

interface FeedState {
  users: FeedUser[];
  loading: boolean;
  error: string | null;
}

const initialState: FeedState = {
  users: [],
  loading: false,
  error: null,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setFeed(state, action: PayloadAction<FeedUser[]>) {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading(state) {
      state.loading = true;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    clearFeed(state) {
      state.users = [];
      state.loading = false;
      state.error = null;
    },
    removeUserFromFeed(state, action: PayloadAction<string>) {
      state.users = state.users.filter(user => user._id !== action.payload);
    },
  },
});

export const {
  setFeed,
  setLoading,
  setError,
  clearFeed,
  removeUserFromFeed
} = feedSlice.actions;

export default feedSlice.reducer;
