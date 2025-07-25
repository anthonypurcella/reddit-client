import SubReddit from "./SubReddit";
import { useSelector, useDispatch } from "react-redux";
import { fetchSubscribedSubreddits } from "../../features/subreddits/subredditsSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { clearPosts } from "../../features/posts/displaySubredditPostsSlice";

export default function SubReddits() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subreddits = useSelector((state) => state.subreddits.list);
  const accessToken = localStorage.getItem("access_token");


    useEffect(() => {
      if (accessToken) {
        dispatch(fetchSubscribedSubreddits(accessToken));
      }
    }, [dispatch, accessToken]);

    if (!accessToken) {
      return;
    }


    function handleSubredditClick(e, subredditName) {
      e.preventDefault();

      localStorage.setItem("subreddit_pick", (subredditName));
      console.log( "Selected subreddit: " + localStorage.getItem("subreddit_pick"));

      dispatch(clearPosts());
      navigate(`/subreddit/posts/${subredditName}`);
    }

  return (
    <div className="sub-reddits">
      {subreddits.map((subreddit) => (
        <button onClick={(e) => handleSubredditClick(e, subreddit.data.display_name)} key={subreddit.data.name}><SubReddit name={subreddit.data.display_name_prefixed} icon={subreddit.data.icon_img}/></button>
      ))}
      <SubReddit />
    </div>
  );
}
