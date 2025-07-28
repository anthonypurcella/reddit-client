import Post from "./Post";
import { useSelector, useDispatch } from "react-redux";
import { fetchSubredditsPosts } from "../../features/posts/displayPostsSlice";
import { fetchDefaultPosts } from "../../features/posts/displayDefaultPostsSlice";
import { fetchSubredditPosts } from "../../features/posts/displaySubredditPostsSlice";
import { useEffect } from "react";


export default function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.list);
  const defaultPosts = useSelector((state) => state.defaultposts.list);

  const accessToken = localStorage.getItem("access_token");
  const loggedIn = localStorage.getItem("logged_token");



  useEffect(() => {
    if (!loggedIn) {
      dispatch(fetchDefaultPosts());
    }
  }, [loggedIn]);

  useEffect(() => {
    if (accessToken && loggedIn) {
      dispatch(fetchSubredditsPosts());
    }
  }, [accessToken, loggedIn]);




  if (loggedIn) {
    return (
      <>
        <div className="posts">
          {posts.map((post) => (
            <Post
              key={post.data.id}
              subreddit={post.data.subreddit_name_prefixed}
              title={post.data.title}
              text={post.data.selftext}
              image={post.data.preview?.images?.[0]?.source?.url?.replace(
                /&amp;/g,
                "&"
              )}
              voteNum={post.data.ups}
              timePosted={post.data.created_utc}
              postId={post.data.id}
              likes={post.data.likes}
              permalink={post.data.permalink}
            />
          ))}
        </div>
      </>
    );
  }

  if (!loggedIn) {
    return (
      <>
        <div className="posts">
          {defaultPosts.map((post) => (
            <Post
              key={post.data.id}
              subreddit={post.data.subreddit_name_prefixed}
              title={post.data.title}
              text={post.data.selftext}
              image={post.data.preview?.images?.[0]?.source?.url?.replace(
                /&amp;/g,
                "&"
              )}
              voteNum={post.data.ups}
              timePosted={post.data.created_utc}
            />
          ))}
        </div>
      </>
    );
  }
}