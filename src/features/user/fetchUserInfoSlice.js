import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getValidAccessToken from "../oauth/getValidAccessToken";

export const fetchUserInfo = createAsyncThunk(
  "/fetch/user",
  async (username) => {
    const accessToken = await getValidAccessToken();

    const response = await fetch(
      `http://localhost:3001/user/${username}?access_token=${accessToken}`
    );

    const data = await response.json();
    const userInfo = data.data;
    return userInfo;
  }
);

const fetchUserInfoSlice = createSlice({
  name: "fetch-user-info",
  initialState: {
    userInfo: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userInfo = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default fetchUserInfoSlice.reducer;
