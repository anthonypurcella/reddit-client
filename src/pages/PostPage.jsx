import SearchBar from "../components/Search/SearchBar";
import FullPost from "../components/Reddit Posts/FullPost";
import SubReddits from "../components/SubReddits/SubReddits";
import { useNavigate, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { clearPosts } from "../features/posts/displayPostsSlice";

export default function PostPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const loggedIn = localStorage.getItem("logged_token");
  
  const currentPermalink = decodeURIComponent(
    location.pathname.split("/").pop()
  );

  function login() {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      navigate("/login");
    }
    localStorage.setItem("logged_token", "loggedIn");
  }

  function logout() {
    navigate("/");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("logged_token");
    localStorage.removeItem("subreddit_pick");
    localStorage.removeItem("saved_subreddits");

    dispatch(clearPosts());
    console.log("Logged out!");
  }

  return (
    <div>
      <div className="header">
        <h1>RedditMinimal</h1>
        <SearchBar />
        {loggedIn ? (
          <button onClick={logout}>Log Out</button>
        ) : (
          <button onClick={login}>Login</button>
        )}
      </div>
      <div className="main-body">
        {loggedIn ? (
          <div className="main-subreddits">
            <SubReddits />
          </div>
        ) : (
          <></>
        )}
        <div className="full-post">
          <FullPost currentPermalink={currentPermalink} />
        </div>
      </div>
    </div>
  );
}
