import { configureStore } from "@reduxjs/toolkit";
import subredditsReducer from '../features/subreddits/subredditsSlice'

const store = configureStore({
    reducer: {
        subreddits: subredditsReducer
    },
})

export default store;