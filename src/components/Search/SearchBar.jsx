import { useState, useEffect, use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchTerm } from "../../features/search/searchRedditSlice";
import { useDebounce } from "react-use";
import Search from "./Search";
import { clearSearches } from "../../features/search/searchRedditSlice";

export default function SearchBar() {
  const dispatch = useDispatch();
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
                <Search subreddit={search.data.display_name_prefixed} />
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
