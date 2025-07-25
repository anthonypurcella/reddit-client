import './App.css'
import HomePage from './pages/HomePage';
import OAuthLogin from './features/oauth/OAuthLogin';
import AuthCallback from './features/oauth/AuthCallback';
import SubredditPage from './pages/SubredditPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/login' element={<OAuthLogin />}/>
        <Route path='/auth/callback' element={<AuthCallback />}/>
        <Route path='/subreddit/posts/:subredditName' element={<SubredditPage />} />
      </Routes>
    </Router>
  )
}

export default App


//RUN NODEMON INDEX.JS from cd server