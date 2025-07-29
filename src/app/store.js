import { configureStore } from "@reduxjs/toolkit";
import subredditsReducer from '../features/subreddits/subredditsSlice';
import postsReducer from '../features/posts/displayPostsSlice';
import defaultpostsReducer from '../features/posts/displayDefaultPostsSlice';
import subredditpostsReducer from '../features/posts/displaySubredditPostsSlice';
import searchRedditReducer from '../features/search/searchRedditSlice';
import votingReducer from '../features/posts/voting/voteSlice';
import fetchPostInfoReducer from '../features/posts/fetchPostInfoSlice'
import fetchUserInfoReducer from '../features/user/fetchUserInfoSlice'


const store = configureStore({
    reducer: {
        subreddits: subredditsReducer,
        posts: postsReducer,
        defaultposts: defaultpostsReducer,
        subredditposts: subredditpostsReducer,
        searchreddit: searchRedditReducer,
        vote: votingReducer,
        fetchpost: fetchPostInfoReducer,
        fetchUserInfo: fetchUserInfoReducer,
    },
})

export default store;