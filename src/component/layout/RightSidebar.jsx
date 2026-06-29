import { Search } from 'lucide-react'

function RightSidebar() {
  const trends = [
    { category: 'Technology · Trending', title: '#ReactJS', posts: '12.5K' },
    { category: 'Sports · Trending', title: '#WorldCup', posts: '45.2K' },
    { category: 'Entertainment · Trending', title: '#NewMovie', posts: '23.8K' },
  ]

  const whoToFollow = [
    { name: 'John Doe', handle: '@johndoe', avatar: 'JD' },
    { name: 'Jane Smith', handle: '@janesmith', avatar: 'JS' },
    { name: 'Alex Johnson', handle: '@alexj', avatar: 'AJ' },
  ]

  return (
    <aside className="sticky top-0 h-screen p-3 overflow-y-auto">
      {/* Search Bar */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray-100 rounded-full py-3 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500 border border-transparent"
        />
      </div>

      {/* Trending */}
      <div className="bg-gray-50 rounded-xl mb-3">
        <h2 className="text-xl font-bold p-3 border-b border-gray-200">Trends for you</h2>
        {trends.map((trend, index) => (
          <div
            key={index}
            className="px-3 py-3 hover:bg-gray-100 cursor-pointer transition-colors"
          >
            <p className="text-xs text-gray-500">{trend.category}</p>
            <p className="font-bold text-sm text-gray-900">{trend.title}</p>
            <p className="text-xs text-gray-500">{trend.posts} posts</p>
          </div>
        ))}
      </div>

      {/* Who to follow */}
      <div className="bg-gray-50 rounded-xl">
        <h2 className="text-xl font-bold p-3 border-b border-gray-200">Who to follow</h2>
        {whoToFollow.map((user, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-3 py-3 hover:bg-gray-100 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                {user.avatar}
              </div>
              <div>
                <p className="font-bold text-sm text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.handle}</p>
              </div>
            </div>
            <button className="bg-black text-white font-bold text-sm px-4 py-1.5 rounded-full hover:bg-gray-800 transition-colors">
              Follow
            </button>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default RightSidebar