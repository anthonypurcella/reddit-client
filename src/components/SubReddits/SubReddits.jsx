import SubReddit from "./SubReddit";
import { useSelector, useDispatch } from "react-redux";
import { fetchSubscribedSubreddits } from "../../features/subreddits/subredditsSlice";
import { useEffect } from "react";

export default function SubReddits() {
  const dispatch = useDispatch();
  const subreddits = useSelector((state) => state.subreddits.list);
  const accessToken = localStorage.getItem("access_token");

    useEffect(() => {
      if (accessToken) {
        dispatch(fetchSubscribedSubreddits(accessToken));
      }
    }, [dispatch, accessToken]);

    if (!accessToken) {
      return <div>Please login first</div>;
    }

  return (
    <div className="sub-reddits">
      {subreddits.map((subreddit) => (
        <li key={subreddit.id}><SubReddit name={subreddit.data.display_name_prefixed} icon={subreddit.data.icon_img}/></li>
      ))}
      <SubReddit />
    </div>
  );
}
