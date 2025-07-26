import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSearchTerm = createAsyncThunk(
    'search/',
    async (searchTerm) => {

        const url = new URL(`https://www.reddit.com/subreddits/search.json?q=${searchTerm}`);
        url.searchParams.append("limit", "5");

        const response = await fetch(url.toString());

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        
        const data = await response.json();
        const searches = data.data.children;

        console.log(searches);
        return searches;
    }
);

const searchRedditSlice = createSlice({
    name: "searchreddit",
    initialState: {
        list: [],
        status: "idle",
        error: null,
    },
    reducers: {
        clearSearches(state) {
            state.list = [];
            state.status = "idle";
            state.error = null;
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchSearchTerm.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchSearchTerm.fulfilled, (state, action) => {
            state.status = "suceeded";
            state.list = [...state.list, ...action.payload];
        })
        .addCase(fetchSearchTerm.rejected, (state, action) => {
            state.status = "failed",
            state.error = action.error.message;
            console.log(state.error);
        })
    }
});

export default searchRedditSlice.reducer;
export const {clearSearches} = searchRedditSlice.actions;