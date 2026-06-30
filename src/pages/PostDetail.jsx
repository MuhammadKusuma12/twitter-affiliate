import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, BarChart3, ChevronLeft, ChevronRight, Heart, MessageCircle, Repeat2, Share } from 'lucide-react'
import ProductCard from '../component/ProductCard'
import { usePosts } from '../context/PostsContext'

const replies = [
  {
    id: 1,
    name: 'Sneakerhead',
    handle: '@sneakerhead',
    avatar: 'SH',
    time: '1h',
    content: 'Warna apa yang kamu beli? Pengen beli juga nih!',
    likes: 12,
  },
  {
    id: 2,
    name: 'Pengguna Saat Ini',
    handle: '@penggunasaatini',
    avatar: 'PS',
    time: '1h',
    content: 'Warna hitam! Cocok buat daily use 😊',
    likes: 5,
  },
]

function Avatar({ value, small = false }) {
  return (
    <div
      className={`rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0 ${
        small ? 'h-9 w-9 text-xs' : 'h-10 w-10 text-sm'
      }`}
    >
      {value}
    </div>
  )
}

function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getPostById } = usePosts()
  const post = getPostById(id)
  const [currentImage, setCurrentImage] = useState(0)
  const hasMultipleImages = post?.images && post.images.length > 1
  const currentProduct = post?.imageProducts?.[currentImage] || post?.product || null

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <div className="sticky top-0 z-10 flex h-14 items-center gap-6 border-b border-gray-200 bg-white/90 px-4 backdrop-blur">
          <button onClick={() => navigate(-1)} className="rounded-full p-2 text-gray-900 hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Tweet</h1>
        </div>
        <div className="px-4 py-12 text-center text-sm text-gray-500">Postingan tidak ditemukan.</div>
      </div>
    )
  }

  const prevImage = (event) => {
    event.stopPropagation()
    setCurrentImage((prev) => (prev === 0 ? post.images.length - 1 : prev - 1))
  }

  const nextImage = (event) => {
    event.stopPropagation()
    setCurrentImage((prev) => (prev === post.images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="min-h-screen bg-white text-left">
      <div className="sticky top-0 z-10 flex h-14 items-center gap-6 border-b border-gray-200 bg-white/90 px-4 backdrop-blur">
        <button onClick={() => navigate(-1)} className="rounded-full p-2 text-gray-900 hover:bg-gray-100">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Tweet</h1>
      </div>

      <article className="border-b border-gray-200 px-4 py-4">
        <div className="flex gap-3">
          <Link to="/profile" onClick={(event) => event.stopPropagation()}>
            <Avatar value={post.avatar} />
          </Link>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 text-sm">
              <span className="font-bold text-gray-900">{post.name}</span>
              <span className="truncate text-gray-500">{post.handle}</span>
              <span className="text-gray-500">·</span>
              <span className="whitespace-nowrap text-gray-500">{post.time}</span>
            </div>

            <p className="mt-1 whitespace-pre-line text-[15px] leading-6 text-gray-900">{post.content}</p>

            {post.images && post.images.length > 0 && (
              <div className="relative mt-3 overflow-hidden rounded-2xl border border-gray-200">
                <img
                  src={post.images[currentImage]}
                  alt={`Post image ${currentImage + 1}`}
                  className="h-72 w-full bg-gray-100 object-cover"
                />
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md hover:bg-white"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-700" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md hover:bg-white"
                    >
                      <ChevronRight className="h-5 w-5 text-gray-700" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                      {post.images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-2 w-2 rounded-full ${idx === currentImage ? 'bg-white' : 'bg-white/50'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {currentProduct && <ProductCard product={currentProduct} />}

            <div className="mt-4 flex max-w-md justify-between text-gray-500">
              <button className="flex items-center gap-2 hover:text-blue-500">
                <MessageCircle className="h-5 w-5" />
                <span className="text-sm">{post.comments}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-green-500">
                <Repeat2 className="h-5 w-5" />
                <span className="text-sm">{post.retweets}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-pink-500">
                <Heart className="h-5 w-5" />
                <span className="text-sm">{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-blue-500">
                <BarChart3 className="h-5 w-5" />
                <span className="text-sm">{post.views}</span>
              </button>
              <button className="hover:text-blue-500">
                <Share className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </article>

      <section className="border-b border-gray-200 px-4 py-4">
        <div className="flex gap-3">
          <Avatar value="PS" small />
          <div className="flex-1">
            <textarea
              placeholder="Tweet balasanmu"
              className="min-h-[100px] w-full resize-none rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-500"
            />
            <div className="mt-2 flex justify-end">
              <button className="rounded-lg bg-gray-500 px-4 py-2 text-sm font-bold text-white hover:bg-gray-600">
                Balas
              </button>
            </div>
          </div>
        </div>
      </section>

      <section>
        {replies.map((reply) => (
          <article key={reply.id} className="border-b border-gray-200 px-4 py-4">
            <div className="flex gap-3">
              <Avatar value={reply.avatar} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1 text-sm">
                  <span className="font-bold text-gray-900">{reply.name}</span>
                  <span className="truncate text-gray-500">{reply.handle}</span>
                  <span className="text-gray-500">·</span>
                  <span className="whitespace-nowrap text-gray-500">{reply.time}</span>
                </div>
                <p className="mt-1 text-[15px] text-gray-900">{reply.content}</p>
                <div className="mt-3 flex items-center gap-12 text-gray-500">
                  <button className="hover:text-blue-500">
                    <MessageCircle className="h-4 w-4" />
                  </button>
                  <button className="flex items-center gap-2 hover:text-pink-500">
                    <Heart className="h-4 w-4" />
                    <span className="text-xs">{reply.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

export default PostDetail
