import SearchBar from "../components/Search/SearchBar";
import Posts from "../components/Reddit Posts/Posts";
import SubReddits from "../components/SubReddits/SubReddits";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      navigate("/login");
    }
  }, [navigate]);

  function logout() {
    fetch("/logout", { method: "POST" })
      .then(() => {
        // Clear localStorage tokens if any
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        // Redirect to login page or OAuthLogin component
        window.location.href = "/login"; // or wherever your OAuthLogin is
      })
      .catch((err) => {
        console.error("Logout failed", err);
      });
  }


  return (
    <div>
      <div className="header">
        <h1>RedditMinimal</h1>
        <SearchBar />
        <button onClick={logout}>Log Out</button>
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
