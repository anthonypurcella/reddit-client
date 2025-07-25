import { configureStore } from "@reduxjs/toolkit";
import subredditsReducer from '../features/subreddits/subredditsSlice'
import postsReducer from '../features/posts/displayPostsSlice'
import defaultpostsReducer from '../features/posts/displayDefaultPostsSlice'


const store = configureStore({
    reducer: {
        subreddits: subredditsReducer,
        posts: postsReducer,
        defaultposts: defaultpostsReducer,
    },
})

export default store;