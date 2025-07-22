import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getValidAccessToken from "../oauth/getValidAccessToken";

export const fetchSubscribedSubreddits = createAsyncThunk(
  "subreddits/fetchSubscribed",
  async () => {
    const accessToken = await getValidAccessToken();

    let subreddits = [];
    let after = null;

    do {
      const url = new URL(
        "https://oauth.reddit.com/subreddits/mine/subscriber"
      );
      url.searchParams.append("limit", "100"); // max allowed per request
      if (after) {
        url.searchParams.append("after", after);
      }

      const response = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "User-Agent": "web:anthonypmm:v1.0 (by /u/anthonypmm)",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.message || "Failed to fetch subreddits");
      }

      subreddits = subreddits.concat(data.data.children);
      console.log(subreddits);
      after = data.data.after;
    } while (after);

    return subreddits;
  }
);

const subredditsSlice = createSlice({
  name: "subreddits",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSubscribedSubreddits.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubscribedSubreddits.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchSubscribedSubreddits.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});


export default subredditsSlice.reducer;