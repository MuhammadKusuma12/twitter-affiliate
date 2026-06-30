import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Calendar, Link as LinkIcon, MapPin } from 'lucide-react'
import PostCard from '../component/PostCard'
import { usePosts } from '../context/PostsContext'

const publicProfiles = {
  TwitterDev: {
    name: 'Twitter Dev',
    handle: '@TwitterDev',
    avatar: 'TD',
    bio: 'Building tools, APIs, and programs for creators and developers.',
    location: 'San Francisco, CA',
    link: 'developer.twitter.com',
    joined: 'Joined February 2013',
    following: '128',
    followers: '594K',
    banner: 'https://picsum.photos/seed/twitterdev-banner/600/300',
  },
  elonmusk: {
    name: 'Elon Musk',
    handle: '@elonmusk',
    avatar: 'EM',
    bio: 'Technology, rockets, AI, and the future.',
    location: 'Earth',
    link: 'x.com/elonmusk',
    joined: 'Joined June 2009',
    following: '823',
    followers: '182M',
    banner: 'https://picsum.photos/seed/elon-banner/600/300',
  },
  reactjs: {
    name: 'ReactJS',
    handle: '@reactjs',
    avatar: 'R',
    bio: 'The library for web and native user interfaces.',
    location: 'Open Source',
    link: 'react.dev',
    joined: 'Joined July 2013',
    following: '76',
    followers: '728K',
    banner: 'https://picsum.photos/seed/react-banner/600/300',
  },
  nasa: {
    name: 'NASA',
    handle: '@nasa',
    avatar: 'NA',
    bio: 'Exploring the universe and our home planet.',
    location: 'Washington, DC',
    link: 'nasa.gov',
    joined: 'Joined December 2007',
    following: '185',
    followers: '81M',
    banner: 'https://picsum.photos/seed/nasa-banner/600/300',
  },
  tokosepatu: {
    name: 'Toko Sepatu Bagus',
    handle: '@tokosepatu',
    avatar: 'TS',
    bio: 'Sepatu original untuk lari, daily wear, dan koleksi favorit kamu.',
    location: 'Indonesia',
    link: 'tokosepatu.example',
    joined: 'Joined March 2024',
    following: '312',
    followers: '8.4K',
    banner: 'https://picsum.photos/seed/shoes-banner/600/300',
  },
  tailwindcss: {
    name: 'Tailwind CSS',
    handle: '@tailwindcss',
    avatar: 'TW',
    bio: 'A utility-first CSS framework for rapidly building custom user interfaces.',
    location: 'Open Source',
    link: 'tailwindcss.com',
    joined: 'Joined November 2017',
    following: '98',
    followers: '403K',
    banner: 'https://picsum.photos/seed/tailwind-banner/600/300',
  },
  vite_js: {
    name: 'Vite',
    handle: '@vite_js',
    avatar: 'V',
    bio: 'Next generation frontend tooling.',
    location: 'Open Source',
    link: 'vite.dev',
    joined: 'Joined April 2020',
    following: '42',
    followers: '119K',
    banner: 'https://picsum.photos/seed/vite-banner/600/300',
  },
  sneakerhead: {
    name: 'Sneakerhead',
    handle: '@sneakerhead',
    avatar: 'SH',
    bio: 'Ngobrolin sneakers, colorway, dan sepatu nyaman buat daily use.',
    location: 'Jakarta',
    link: 'sneakerhead.example',
    joined: 'Joined August 2022',
    following: '420',
    followers: '12.8K',
    banner: 'https://picsum.photos/seed/sneakerhead-banner/600/300',
  },
}

const normalizeHandle = (handle = '') => handle.replace('@', '').toLowerCase()

function getFallbackProfile(handle, posts) {
  const matchingPost = posts.find((post) => normalizeHandle(post.handle) === handle)
  const readableName = handle
    .split(/[_-]/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    name: matchingPost?.name ?? readableName,
    handle: matchingPost?.handle ?? `@${handle}`,
    avatar: matchingPost?.avatar ?? readableName.slice(0, 2).toUpperCase(),
    bio: 'Profil publik pengguna.',
    location: 'Indonesia',
    link: `${handle}.example`,
    joined: 'Joined June 2026',
    following: '120',
    followers: '1.2K',
    banner: `https://picsum.photos/seed/${handle}-banner/600/300`,
  }
}

function UserProfile() {
  const { handle = '' } = useParams()
  const navigate = useNavigate()
  const { homePosts, profilePosts } = usePosts()
  const [activeTab, setActiveTab] = useState('posts')
  const normalizedHandle = normalizeHandle(handle)
  const allPosts = useMemo(() => [...homePosts, ...profilePosts], [homePosts, profilePosts])
  const userPosts = allPosts.filter((post) => normalizeHandle(post.handle) === normalizedHandle)
  const profile = publicProfiles[handle] ?? publicProfiles[normalizedHandle] ?? getFallbackProfile(normalizedHandle, allPosts)

  const tabs = [
    { key: 'posts', label: 'Posts' },
    { key: 'replies', label: 'Replies' },
    { key: 'media', label: 'Media' },
    { key: 'likes', label: 'Likes' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-30 flex h-14 items-center gap-6 border-b border-gray-200 bg-white/95 px-4 backdrop-blur">
        <button onClick={() => navigate(-1)} className="rounded-full p-2 text-gray-900 hover:bg-gray-100">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="text-left">
          <div className="text-lg font-bold leading-5 text-gray-900">{profile.name}</div>
          <div className="mt-0.5 text-xs leading-4 text-gray-500">{userPosts.length} posts</div>
        </div>
      </div>

      <div className="relative h-48 bg-gradient-to-r from-blue-400 to-purple-500">
        <img src={profile.banner} alt={`${profile.name} banner`} className="h-full w-full object-cover" />
      </div>

      <div className="border-b border-gray-200 px-4 pb-4 pt-4">
        <div className="-mt-10 mb-3 flex items-start justify-between">
          <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-blue-400 to-purple-500 text-3xl font-bold text-white shadow-md">
            {profile.avatar}
          </div>
          <button className="mt-10 rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm font-bold text-black transition-colors hover:bg-gray-50">
            Follow
          </button>
        </div>

        <div className="text-left">
          <div className="text-2xl font-extrabold leading-7 text-black">{profile.name}</div>
          <div className="mt-1 text-sm font-semibold text-gray-500">{profile.handle}</div>
          <p className="mt-3 text-sm text-gray-900">{profile.bio}</p>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {profile.location}
          </span>
          <span className="flex items-center gap-1">
            <LinkIcon className="h-4 w-4" />
            <span className="text-blue-500">{profile.link}</span>
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {profile.joined}
          </span>
        </div>

        <div className="mt-3 flex gap-4 text-sm">
          <span className="text-gray-900">
            <span className="font-bold">{profile.following}</span> <span className="text-gray-500">Following</span>
          </span>
          <span className="text-gray-900">
            <span className="font-bold">{profile.followers}</span> <span className="text-gray-500">Followers</span>
          </span>
        </div>
      </div>

      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`relative flex-1 py-4 text-sm font-medium transition-colors ${
              activeTab === tab.key ? 'text-black' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <div className="absolute bottom-0 left-1/2 h-1 w-14 -translate-x-1/2 rounded-full bg-blue-500" />
            )}
          </button>
        ))}
      </div>

      {activeTab === 'posts' && (
        <div>
          {userPosts.length > 0 ? (
            userPosts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="px-4 py-12 text-center text-sm text-gray-500">Belum ada post dari pengguna ini.</div>
          )}
        </div>
      )}
      {activeTab !== 'posts' && (
        <div className="px-4 py-12 text-center text-sm text-gray-500">Belum ada aktivitas di tab ini.</div>
      )}
    </div>
  )
}

export default UserProfile
