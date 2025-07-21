import './App.css'
import SearchBar from './components/Search/SearchBar';
import Posts from './components/Reddit Posts/Posts';
import SubReddits from './components/SubReddits/SubReddits';

function App() {

  return (
    <div>
      <div className='header'>
        <h1>RedditMinimal</h1>
        <SearchBar />
      </div>
      <div className='main-body'>
        <div className='main-posts'>
          <Posts />
        </div>
        <div className='main-subreddits'>
          <SubReddits />
        </div>
      </div>
    </div>
  );
}

export default App
