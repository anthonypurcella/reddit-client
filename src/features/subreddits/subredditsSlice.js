import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getValidAccessToken from "../oauth/getValidAccessToken";

export const fetchSubscribedSubreddits = createAsyncThunk(
  "subreddits/fetchSubscribed",
  async () => {
    const accessToken = await getValidAccessToken();

    let subreddits = [];


    const response = await fetch(
      `https://redditminimal-client-server.onrender.com/api/subreddits?access_token=${accessToken}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.message || "Failed to fetch subreddits");
    }

    subreddits = subreddits.concat(data.data.children);
    console.log(subreddits);

    function compare(a, b) {
      const nameA = a.data.display_name.toLowerCase();
      const nameB = b.data.display_name.toLowerCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    }

    localStorage.setItem(
      "saved_subreddits",
      JSON.stringify(subreddits.sort(compare))
    );
    return subreddits.sort(compare);
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