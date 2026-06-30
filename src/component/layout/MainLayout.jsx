import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { Home, User, ShoppingBag } from 'lucide-react'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
import Topbar from './Topbar'

function MainLayout() {
  const location = useLocation()
  const showTopbar = location.pathname === '/'

  return (
    <div className="flex justify-center min-h-screen bg-white">
      {/* Left Sidebar - hidden on mobile, visible on lg+ */}
      <div className="hidden lg:flex w-[68px] xl:w-[275px] flex-shrink-0">
        <LeftSidebar />
      </div>

      {/* Main Content - full width mobile, max-width on desktop */}
      <div className="w-full lg:max-w-[600px] xl:max-w-[600px] border-x border-gray-200 min-h-screen pb-14 lg:pb-0">
        {showTopbar && <Topbar />}
        <Outlet />
      </div>

      {/* Right Sidebar - hidden on mobile/tablet, visible on xl+ */}
      <div className="hidden xl:block w-[350px] flex-shrink-0">
        <RightSidebar />
      </div>

      {/* Mobile Bottom Navigation - visible only on mobile/tablet */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around items-center h-14">
          {[
            { to: '/', icon: Home, label: 'Home' },
            { to: '/profile', icon: User, label: 'Profile' },
            { to: '/shopping', icon: ShoppingBag, label: 'Shopping' },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-4 py-1 ${
                  isActive ? 'text-blue-500' : 'text-gray-500'
                }`
              }
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default MainLayout