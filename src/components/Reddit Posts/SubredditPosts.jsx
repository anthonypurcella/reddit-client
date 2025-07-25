import Post from "./Post";
import { useSelector, useDispatch } from "react-redux";
import { fetchSubredditPosts } from "../../features/posts/displaySubredditPostsSlice";
import { useEffect } from "react";

export default function SubredditPosts() {
  const dispatch = useDispatch();
  const subredditPosts = useSelector((state) => state.subredditposts.list);
  const subredditPick = localStorage.getItem("subreddit_pick");


  useEffect(() => {
    if (subredditPick) {
      dispatch(fetchSubredditPosts());
    }
  }, [subredditPick]);


    return (
      <>
        <div className="posts">
          {subredditPosts.map((post) => (
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