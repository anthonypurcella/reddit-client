import Post from "./Post";
import { useSelector, useDispatch } from "react-redux";
import { fetchSubredditsPosts } from "../../features/posts/displayPostsSlice";
import { useEffect } from "react";

export default function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.list);
  const after = useSelector((state) => state.posts.after);
  const accessToken = localStorage.getItem("access_token");

useEffect(() => {
  if (accessToken && posts.length === 0) {
    console.log("AFTER TOKEN BEING USED:", after);
    dispatch(fetchSubredditsPosts());
  }
}, [dispatch, accessToken, posts.length]);

   if (!accessToken) {
     return;
   }

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
          />
        ))}
      </div>
    </>
  );
}