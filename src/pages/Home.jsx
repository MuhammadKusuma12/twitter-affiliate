import { useState } from 'react'
import { Image, MapPin, Smile, Calendar } from 'lucide-react'
import PostCard from '../component/PostCard'

function Home() {
  const [tweet, setTweet] = useState('')

  const posts = [
    // Post with images (carousel)
    {
      id: 1,
      name: 'Twitter Dev',
      handle: '@TwitterDev',
      avatar: 'TD',
      time: '2h',
      content: 'Introducing our new affiliate program! Join now and start earning. 🚀\n\nEarn up to 30% commission on every sale. Sign up today and start promoting products you love.',
      images: [
        'https://picsum.photos/seed/tweet1/600/400',
        'https://picsum.photos/seed/tweet1b/600/400',
        'https://picsum.photos/seed/tweet1c/600/400',
      ],
      comments: 12,
      retweets: 45,
      likes: 234,
      views: '1.2K',
    },
    // Post without image
    {
      id: 2,
      name: 'Elon Musk',
      handle: '@elonmusk',
      avatar: 'EM',
      time: '1h',
      content: 'The future of AI is incredibly exciting. We are just scratching the surface of what is possible. 🚀',
      images: [],
      comments: 2341,
      retweets: 12345,
      likes: 56789,
      views: '1.2M',
    },
    // Post with single image
    {
      id: 3,
      name: 'ReactJS',
      handle: '@reactjs',
      avatar: '⚛',
      time: '4h',
      content: 'React 19 is here! Check out all the new features and improvements including the new compiler, server components, and better performance.',
      images: [
        'https://picsum.photos/seed/tweet2/600/400',
        'https://picsum.photos/seed/tweet2b/600/400',
      ],
      comments: 89,
      retweets: 567,
      likes: 2341,
      views: '12K',
    },
    // Post without image
    {
      id: 4,
      name: 'NASA',
      handle: '@nasa',
      avatar: '🔭',
      time: '3h',
      content: 'New images from the James Webb Space Telescope reveal never-before-seen details of distant galaxies. The universe is truly magnificent.',
      images: [],
      comments: 567,
      retweets: 3456,
      likes: 12345,
      views: '890K',
    },
    // Post with single image
    {
      id: 5,
      name: 'Tailwind CSS',
      handle: '@tailwindcss',
      avatar: '🌊',
      time: '6h',
      content: 'Tailwind CSS v4 is now available with the new @tailwindcss/vite plugin! Faster builds, smaller bundles, and a better developer experience.',
      images: [
        'https://picsum.photos/seed/tweet3/600/400',
      ],
      comments: 34,
      retweets: 123,
      likes: 892,
      views: '5.4K',
    },
    // Post with multiple images
    {
      id: 6,
      name: 'Vite',
      handle: '@vite_js',
      avatar: 'V',
      time: '8h',
      content: 'Vite 8 is out! Lightning fast HMR, optimized builds, and first-class support for modern frameworks. Upgrade today! ⚡',
      images: [
        'https://picsum.photos/seed/tweet4/600/400',
        'https://picsum.photos/seed/tweet4b/600/400',
        'https://picsum.photos/seed/tweet4c/600/400',
        'https://picsum.photos/seed/tweet4d/600/400',
      ],
      comments: 56,
      retweets: 234,
      likes: 1567,
      views: '8.9K',
    },
  ]

  return (
    <div>
      {/* Tweet Composer */}
      <div className="px-3 py-3 border-b border-gray-200">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">
            MK
          </div>
          <div className="flex-1">
            <textarea
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
              placeholder="What is happening?!"
              className="w-full text-lg outline-none resize-none placeholder-gray-500 min-h-[60px]"
              rows={2}
            />
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex gap-2">
                <button className="p-2 rounded-full hover:bg-blue-50 text-blue-500 transition-colors">
                  <Image className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full hover:bg-blue-50 text-blue-500 transition-colors">
                  <MapPin className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full hover:bg-blue-50 text-blue-500 transition-colors">
                  <Smile className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full hover:bg-blue-50 text-blue-500 transition-colors">
                  <Calendar className="w-5 h-5" />
                </button>
              </div>
              <button
                disabled={!tweet.trim()}
                className="bg-blue-500 text-white font-bold px-5 py-2 rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Home