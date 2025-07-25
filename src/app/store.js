import { configureStore } from "@reduxjs/toolkit";
import subredditsReducer from '../features/subreddits/subredditsSlice'
import postsReducer from '../features/posts/displayPostsSlice'
import defaultpostsReducer from '../features/posts/displayDefaultPostsSlice'
import subredditpostsReducer from '../features/posts/displaySubredditPostsSlice'


const store = configureStore({
    reducer: {
        subreddits: subredditsReducer,
        posts: postsReducer,
        defaultposts: defaultpostsReducer,
        subredditposts: subredditpostsReducer,
    },
})

export default store;