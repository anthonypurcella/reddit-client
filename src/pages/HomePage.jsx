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

  return (
    <div>
      <div className="header">
        <h1>RedditMinimal</h1>
        <SearchBar />
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
