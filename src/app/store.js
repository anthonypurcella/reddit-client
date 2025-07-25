import { configureStore } from "@reduxjs/toolkit";
import subredditsReducer from '../features/subreddits/subredditsSlice'
import postsReducer from '../features/posts/displayPostsSlice'


const store = configureStore({
    reducer: {
        subreddits: subredditsReducer,
        posts: postsReducer,
    },
})

export default store;