import './App.css'
import HomePage from './pages/HomePage';
import OAuthLogin from './features/oauth/OAuthLogin';
import AuthCallback from './features/oauth/AuthCallback';
import SubredditPage from './pages/SubredditPage';
import { BrowserRouter, Routes, Route } from 'react-router';
import PostPage from './pages/PostPage';

function App() {
    
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/login' element={<OAuthLogin />}/>
        <Route path='/auth/callback' element={<AuthCallback />}/>
        <Route path='/subreddit/posts/:subredditName' element={<SubredditPage />} />
        <Route path='/post/:postPermalink' element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App


//RUN NODEMON INDEX.JS from cd server