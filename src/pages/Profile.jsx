import { useState } from 'react'
import { Calendar, MapPin, Link as LinkIcon } from 'lucide-react'
import { usePosts } from '../context/PostsContext'
import PostCard from '../component/PostCard'

function Profile() {
  const { profilePosts, addAffiliateToPost } = usePosts()
  const [activeTab, setActiveTab] = useState('posts')

  const tabs = [
    { key: 'posts', label: 'Posts' },
    { key: 'replies', label: 'Replies' },
    { key: 'media', label: 'Media' },
    { key: 'likes', label: 'Likes' },
  ]

  const handleAffiliateSelect = (postId, product, imageIndex) => {
    addAffiliateToPost(postId, product, imageIndex)
  }

  return (
    <div>
      {/* Banner */}
      <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 relative">
        {/* Cover image */}
        <img
          src="https://picsum.photos/seed/banner/600/300"
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Info */}
      <div className="px-4 pt-6 pb-4 border-b border-gray-200">
        {/* Avatar */}
        <div className="flex justify-between items-start -mt-4 mb-2">
          <div className="w-13 h-13 rounded-full border-3 border-white bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-[9px] font-bold shadow-md">
            MK
          </div>
          <button className="mt-2 px-4 py-1.5 border border-gray-300 rounded-full font-bold text-sm text-black hover:bg-gray-50 transition-colors">
            Edit profile
          </button>
        </div>

        {/* Name & Handle */}
        <div className="text-left">
          <h2 className="text-2xl font-extrabold text-black">Muhammad Kusuma</h2>
          <p className="text-black text-sm font-extrabold">@muhammadkusuma</p>
        </div>

        {/* Bio */}
        <p className="text-gray-900 text-sm mt-3 text-left">
          Full-stack developer passionate about building amazing web experiences. React • Node.js • Tailwind CSS
        </p>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            Indonesia
          </span>
          <span className="flex items-center gap-1">
            <LinkIcon className="w-4 h-4" />
            <a href="#" className="text-blue-500 hover:underline">github.com/muhammadkusuma</a>
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Joined June 2026
          </span>
        </div>

        {/* Following / Followers */}
        <div className="flex gap-4 mt-3 text-sm">
          <span className="text-gray-900">
            <span className="font-bold">1,234</span>{' '}
            <span className="text-gray-500">Following</span>
          </span>
          <span className="text-gray-900">
            <span className="font-bold">5,678</span>{' '}
            <span className="text-gray-500">Followers</span>
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-4 text-sm font-medium relative transition-colors ${
              activeTab === tab.key ? 'text-black' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-blue-500 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Profile Feed */}
      <div>
{activeTab === 'posts' && (
           profilePosts.map((post) => (
             <PostCard key={post.id} post={post} showStar={true} onAffiliateSelect={handleAffiliateSelect} />
           ))
         )}
        {activeTab === 'replies' && (
          <div className="py-12 text-center text-gray-500 text-sm">
            No replies yet
          </div>
        )}
        {activeTab === 'media' && (
          <div className="py-12 text-center text-gray-500 text-sm">
            No media yet
          </div>
        )}
        {activeTab === 'likes' && (
          <div className="py-12 text-center text-gray-500 text-sm">
            No likes yet
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile