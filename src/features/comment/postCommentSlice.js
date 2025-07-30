import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getValidAccessToken from "../oauth/getValidAccessToken";

export const postComment = createAsyncThunk(
  "/post/comment",
  async ({id, text}) => {
    console.log(`Posting comment on post[${id}]: '${text}'`);
    const accessToken = await getValidAccessToken();

    const url = new URL(`https://oauth.reddit.com/api/comment`);

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": "web:anthonypmm:v1.0 (by /u/anthonypmm)",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        text: text,
        thing_id: id,
        api_type: "json",
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    console.log("Comment successful!");
    return { text, id };
  }
);

const postCommentSlice = createSlice({
  name: "comment",
  initialState: {
    currentId: "",
    currentText: "",
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentId = action.payload.id;
        state.currentText = action.payload.text;
      })
      .addCase(postComment.rejected, (state, action) => {
        state.status = "failed";
        console.log(action.error.message);
      });
  },
});

export default postCommentSlice.reducer;
