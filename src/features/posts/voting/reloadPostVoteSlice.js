import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getValidAccessToken from "../../oauth/getValidAccessToken";

export const reloadPost = createAsyncThunk(
  "/post-vote/reload",
  async ( permalink ) => {
    console.log(`Reloading post: ${permalink}`);
    const accessToken = await getValidAccessToken();


    const response = await fetch(
      `http://localhost:3001/api/reddit-post?permalink=${encodeURIComponent(
        permalink
      )}&access_token=${accessToken}`
    );


    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = await response.json();
    const postData = data[0].data.children[0].data;

    console.log(postData);
    return postData;
  }
);

const reloadPostVoteSlice = createSlice({
    name: 'reload-post',
    initialState: {
        post: {},
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(reloadPost.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(reloadPost.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.post = action.payload;
        })
        .addCase(reloadPost.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
});

export default reloadPostVoteSlice.reducer;
