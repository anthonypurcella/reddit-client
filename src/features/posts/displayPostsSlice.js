import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getValidAccessToken from "../oauth/getValidAccessToken";

export const fetchSubredditsPosts = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    const accessToken = await getValidAccessToken();

      const response = await fetch(`http://localhost:3001/api/posts?access_token=${accessToken}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const data = await response.json();
      const posts = data.data.children;
      console.log(posts);
      const after = data.data.after;

      return { posts, after };
  }
);

const displayPostsSlice = createSlice({
  name: "posts",
  initialState: {
    list: [],
    after: null,
    status: "idle",
    error: null,
  },
  reducers: {
    clearPosts(state) {
      state.list = [];
      state.after = null;
      state.status = "idle";
      state.error = null;
      console.log(`Posts cleared!`);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSubredditsPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubredditsPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = [...state.list, ...action.payload.posts];
        state.after = action.payload.after;
      })
      .addCase(fetchSubredditsPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearPosts } = displayPostsSlice.actions;
export default displayPostsSlice.reducer;
