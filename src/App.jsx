import './App.css'
import HomePage from './pages/HomePage';
import OAuthLogin from './features/oauth/OAuthLogin';
import AuthCallback from './features/oauth/AuthCallback';
import { BrowserRouter as Router, Routes, Route } from 'react-router';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/login' element={<OAuthLogin />}/>
        <Route path='/auth/callback' element={<AuthCallback />}/>
      </Routes>
    </Router>
  )
}

export default App


//RUN NODEMON INDEX.JS from cd server