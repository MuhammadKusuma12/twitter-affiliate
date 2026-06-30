import { Routes, Route } from 'react-router-dom'
import MainLayout from './component/layout/MainLayout'
import Home from './pages/Home'
import Profile from './pages/Profile'
import PostDetail from './pages/PostDetail'
import Shopping from './pages/Shopping'
import { PostsProvider } from './context/PostsContext'

function App() {
  return (
    <PostsProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/shopping" element={<Shopping />} />
        </Route>
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
    </PostsProvider>
  )
}

export default App