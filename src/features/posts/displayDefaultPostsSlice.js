import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDefaultPosts = createAsyncThunk(
    "posts/fetchDefaultPosts",
    async () => {
        const url = new URL("https://www.reddit.com/r/popular.json");

        const response = await fetch(url.toString());

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const data = await response.json();
        const defaultposts = data.data.children;
        console.log(defaultposts);

        return defaultposts;
    }
);

const displayDefaultPostsSlice = createSlice({
    name: "defaultposts",
    initialState: {
        list: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(fetchDefaultPosts.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchDefaultPosts.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.list = [...state.list, ...action.payload];
        })
        .addCase(fetchDefaultPosts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
            console.log(state.error);
        })
    } 
});

export default displayDefaultPostsSlice.reducer;