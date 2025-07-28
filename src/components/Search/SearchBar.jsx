import { useState, useEffect, use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchTerm } from "../../features/search/searchRedditSlice";
import { useDebounce } from "react-use";
import Search from "./Search";
import { clearSearches } from "../../features/search/searchRedditSlice";
import { clearSubPosts } from "../../features/posts/displaySubredditPostsSlice";
import { clearPosts } from "../../features/posts/displayPostsSlice";
import { fetchSubredditPosts } from "../../features/posts/displaySubredditPostsSlice";
import { useNavigate } from "react-router";


export default function SearchBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearchChange(searched) {
    dispatch(clearSearches());
    setSearchTerm(searched);
  }

  const searches = useSelector((state) => state.searchreddit.list);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const handleOpenModal = (e) => {
    e.preventDefault();
    setShowSearchModal(true);
  };
  const handleCloseModal = () => {
    setShowSearchModal(false);
  };

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState();
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 450, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(fetchSearchTerm(debouncedSearchTerm));
    }
  }, [debouncedSearchTerm]);

  function handleSubredditClick(e, subredditName) {
    e.preventDefault();

    if (location.pathname === `/subreddit/posts/${subredditName}`) {
          return;
        }

    console.log(`Selected subreddit: ${subredditName}`);

    dispatch(clearPosts());
    dispatch(clearSubPosts());
    navigate(`/subreddit/posts/${subredditName}`);
    dispatch(fetchSubredditPosts(subredditName));
  }

  return (
    <div className="search-bar">
      <input
        id="redditsearch"
        placeholder="Search SubReddits"
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearchChange(e.currentTarget.value)}
        onClick={handleOpenModal}
      />
      {showSearchModal ? (
        <div>
          <div className="modal-overlay" onMouseLeave={handleCloseModal}>
            <div className="modal-content">
              {searches.map((search) => (
                <button
                  key={search.data.id}
                  onClick={(e) =>
                    handleSubredditClick(e, search.data.display_name)
                  }
                >
                  <Search subreddit={search.data.display_name_prefixed} />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
