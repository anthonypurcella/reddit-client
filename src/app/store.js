import { configureStore } from "@reduxjs/toolkit";
import subredditsReducer from '../features/subreddits/subredditsSlice';
import postsReducer from '../features/posts/displayPostsSlice';
import defaultpostsReducer from '../features/posts/displayDefaultPostsSlice';
import subredditpostsReducer from '../features/posts/displaySubredditPostsSlice';
import searchRedditReducer from '../features/search/searchRedditSlice';
import votingReducer from '../features/posts/voting/voteSlice';
import reloadPostReducer from '../features/posts/voting/reloadPostVoteSlice'


const store = configureStore({
    reducer: {
        subreddits: subredditsReducer,
        posts: postsReducer,
        defaultposts: defaultpostsReducer,
        subredditposts: subredditpostsReducer,
        searchreddit: searchRedditReducer,
        vote: votingReducer,
        reloadpost: reloadPostReducer,
    },
})

export default store;