import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getValidAccessToken from "../oauth/getValidAccessToken";

export const fetchSubredditPosts = createAsyncThunk(
  "posts/subredditposts",
  async () => {
    const accessToken = await getValidAccessToken();
    let subreddit = localStorage.getItem("subreddit_pick");
    console.log(subreddit);

    const url = new URL(`https://oauth.reddit.com/r/${subreddit}/.json`);
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
    const subredditPosts = data.data.children;
    console.log(subredditPosts);

    return subredditPosts;
  }
);

const displaySubredditPostsSlice = createSlice({
  name: "subredditposts",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearSubPosts(state) {
      state.list = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSubredditPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubredditPosts.fulfilled, (state, action) => {
        state.status = "suceeded";
        state.list = [...state.list, ...action.payload];
      })
      .addCase(fetchSubredditPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.log(state.error);
      });
  },
});

export const { clearSubPosts } = displaySubredditPostsSlice.actions;
export default displaySubredditPostsSlice.reducer;
