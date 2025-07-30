import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getValidAccessToken from "../../oauth/getValidAccessToken";

export const postVote = createAsyncThunk(
    "/post/vote",
    async ({id, voteNum}) => {
        console.log(`Dispatched - ID: ${id} with ${voteNum} vote.`);
        const accessToken = await getValidAccessToken();
        const url = new URL("https://oauth.reddit.com/api/vote");

        const response = await fetch(url.toString(), {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "User-Agent": "web:anthonypmm:v1.0 (by /u/anthonypmm)",
          },
          body: new URLSearchParams({
            id: id,
            dir: voteNum
          })
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        console.log('Voting Successful!');
        return {id, voteNum};
    }
);

const voteSlice = createSlice({
  name: 'vote',
  initialState: {
    currentId: '',
    currentVote: 0,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(postVote.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(postVote.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.currentId = action.payload.id;
      state.currentVote = action.payload.voteNum;
    })
    .addCase(postVote.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })
  }
});

export default voteSlice.reducer;