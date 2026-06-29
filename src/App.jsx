import { Routes, Route } from 'react-router-dom'
import MainLayout from './component/layout/MainLayout'
import Home from './pages/Home'
import Profile from './pages/Profile'
import PostDetail from './pages/PostDetail'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/post/:id" element={<PostDetail />} />
    </Routes>
  )
}

export default App