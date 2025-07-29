import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getValidAccessToken from "../oauth/getValidAccessToken";

export const fetchPostInfo = createAsyncThunk(
  "/fetch/post-info",
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
    console.log(data);
    const postData = data[0].data.children[0].data;
    const postComments = data[1].data.children;

    console.log(postData);
    console.log(postComments);
    return {postData, postComments};
  }
);

const fetchPostInfoSlice = createSlice({
    name: 'fetch-post',
    initialState: {
        post: {},
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers(builder) {
        builder
          .addCase(fetchPostInfo.pending, (state) => {
            state.status = "loading";
          })
          .addCase(fetchPostInfo.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.post = action.payload;
          })
          .addCase(fetchPostInfo.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          });
    }
});

export default fetchPostInfoSlice.reducer;
