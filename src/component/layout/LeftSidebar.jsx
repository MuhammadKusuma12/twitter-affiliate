import { NavLink } from 'react-router-dom'
import { Home, User, ShoppingBag } from 'lucide-react'

function LeftSidebar() {
  const menuItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/profile', icon: User, label: 'Profile' },
    { to: '/shopping', icon: ShoppingBag, label: 'Shopping' },
  ]

  return (
    <aside className="sticky top-0 h-screen flex flex-col items-end p-2 pt-2 border-r border-gray-200 w-full">
      <div className="w-full flex flex-col items-center xl:items-start">
        {/* Logo */}
        <div className="px-3 py-2 mb-1">
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-blue-500">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1 w-full">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center justify-center xl:justify-start gap-4 px-3 py-3 rounded-full text-lg transition-colors ${
                  isActive
                    ? 'font-bold text-black'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <item.icon className="w-6 h-6 flex-shrink-0" />
              <span className="hidden xl:inline">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Post Button */}
        <button className="w-12 h-12 xl:w-full mt-3 bg-blue-500 text-white font-bold py-3 px-5 rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center">
          <svg className="w-5 h-5 xl:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden xl:inline">Post</span>
        </button>
      </div>
    </aside>
  )
}

export default LeftSidebar