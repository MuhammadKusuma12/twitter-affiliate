import { useState } from 'react'
import { Image, MapPin, Smile, Calendar } from 'lucide-react'
import { usePosts } from '../context/PostsContext'
import PostCard from '../component/PostCard'

function Home() {
  const { homePosts } = usePosts()
  const [tweet, setTweet] = useState('')

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
        {homePosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Home