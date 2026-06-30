import { Routes, Route } from 'react-router-dom'
import MainLayout from './component/layout/MainLayout'
import Home from './pages/Home'
import Profile from './pages/Profile'
import PostDetail from './pages/PostDetail'
import Shopping from './pages/Shopping'
import UserProfile from './pages/UserProfile'
import { PostsProvider } from './context/PostsContext'

function App() {
  return (
    <PostsProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user/:handle" element={<UserProfile />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Route>
      </Routes>
    </PostsProvider>
  )
}

export default App
