import SubReddit from "./SubReddit";
import { useSelector, useDispatch } from "react-redux";
import { fetchSubscribedSubreddits } from "../../features/subreddits/subredditsSlice";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { clearSubPosts } from "../../features/posts/displaySubredditPostsSlice";
import { fetchSubredditPosts } from "../../features/posts/displaySubredditPostsSlice";

export default function SubReddits() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const subreddits = useSelector((state) => state.subreddits.list);
  const accessToken = localStorage.getItem("access_token");

  const [currentSubreddit, setCurrentSubreddit] = useState("");

  useEffect(() => {
    if (subreddits && subreddits.length > 0) {
      return;
    }
    if (accessToken) {
      dispatch(fetchSubscribedSubreddits(accessToken));
    }
  }, [dispatch, accessToken]);

  useEffect(() => {
    if (location.pathname.includes("/subreddit")) {
      const subredditName = location.pathname.split("/").pop();

      if (subredditName !== currentSubreddit) {
        setCurrentSubreddit(subredditName);
      }
    }
  }, [location.pathname]);

  function handleSubredditClick(e, subredditName) {
    e.preventDefault();

    if (location.pathname === `/subreddit/posts/${subredditName}`) {
      return;
    }

    console.log(`Selected subreddit: ${subredditName}`);

    dispatch(clearSubPosts());
    navigate(`/subreddit/posts/${subredditName}`);
    dispatch(fetchSubredditPosts(subredditName));
  }

  return (
    <div className="sub-reddits">
      {currentSubreddit && (
        <div className="active-subreddit">
          <p>r/{currentSubreddit}</p>
        </div>
      )}
      {subreddits.map((subreddit) => {
        const name = subreddit.data.display_name;
        return (
          <button
            onClick={(e) => handleSubredditClick(e, name)}
            key={subreddit.data.name}
          >
            <SubReddit
              name={subreddit.data.display_name_prefixed}
              icon={subreddit.data.icon_img}
            />
          </button>
        );
      })}
    </div>
  );
}
