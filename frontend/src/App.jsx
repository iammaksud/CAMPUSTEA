import { Routes, Route, useLocation } from 'react-router-dom'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import BottomNav from './components/BottomNav.jsx'

import Home from './pages/Home.jsx'
import Explore from './pages/Explore.jsx'
import PostDetail from './pages/PostDetail.jsx'
import CreatePost from './pages/CreatePost.jsx'
import EditPost from './pages/EditPost.jsx'
import Profile from './pages/Profile.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Categories from './pages/Categories.jsx'
import CategoryPosts from './pages/CategoryPosts.jsx'
import Trending from './pages/Trending.jsx'
import Settings from './pages/Settings.jsx'
import Reports from './pages/Reports.jsx'
import Notifications from './pages/Notifications.jsx'
import Guidelines from './pages/Guidelines.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  // Admin has its own sidebar + layout, so skip the normal
  // Navbar / Footer / BottomNav chrome on that route.
  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    )
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/post/:id/edit" element={<EditPost />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryPosts />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/guidelines" element={<Guidelines />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      {/* Fixed bottom navigation for mobile/tablet, hidden on desktop */}
      <BottomNav />
    </>
  )
}

export default App
