import SearchBar from "../components/Search/SearchBar";
import Posts from "../components/Reddit Posts/Posts";
import SubReddits from "../components/SubReddits/SubReddits";
import { useNavigate } from "react-router";

export default function HomePage() {
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem("logged_token");

  function login() {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken && !loggedIn) {
      navigate("/login");
    }
    localStorage.setItem("logged_token", "loggedIn");
  }

  function logout() {
    navigate("/");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("logged_token");

    console.log("You are now logged out!");
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
        <div className="main-posts">
          <Posts />
        </div>
        <div className="main-subreddits">
          <SubReddits />
        </div>
      </div>
    </div>
  );
}
