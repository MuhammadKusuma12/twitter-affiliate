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

const postReplies = {
  0: [
    { id: 1, name: 'Affiliate Hunter', handle: '@affiliatehunter', avatar: 'AH', time: '1h', content: 'Komisinya lumayan juga. Ada dashboard untuk tracking klik dan konversi?', likes: 18 },
    { id: 2, name: 'Creator Lokal', handle: '@creatorlokal', avatar: 'CL', time: '45m', content: 'Menarik nih buat kreator kecil yang sering review produk.', likes: 9 },
  ],
  1: [
    { id: 1, name: 'Sneakerhead', handle: '@sneakerhead', avatar: 'SH', time: '1h', content: 'Warna apa yang kamu beli? Pengen beli juga nih!', likes: 12 },
    { id: 2, name: 'Pengguna Saat Ini', handle: '@penggunasatini', avatar: 'PS', time: '1h', content: 'Warna hitam! Cocok buat daily use.', likes: 5 },
  ],
  2: [
    { id: 1, name: 'AI Researcher', handle: '@airesearcher', avatar: 'AI', time: '58m', content: 'Setuju. Bagian paling menarik justru bagaimana AI membantu pekerjaan harian.', likes: 221 },
    { id: 2, name: 'Builder', handle: '@buildmore', avatar: 'BM', time: '42m', content: 'Exciting, tapi safety dan transparansi tetap harus ikut berkembang.', likes: 119 },
  ],
  3: [
    { id: 1, name: 'Frontend Dev', handle: '@frontenddev', avatar: 'FD', time: '3h', content: 'Compiler barunya bikin penasaran. Semoga migrasinya mulus untuk project besar.', likes: 87 },
    { id: 2, name: 'React Fan', handle: '@reactfan', avatar: 'RF', time: '2h', content: 'Server components makin matang. Dokumentasinya juga makin enak dibaca.', likes: 64 },
  ],
  4: [
    { id: 1, name: 'Space Nerd', handle: '@spacenerd', avatar: 'SN', time: '2h', content: 'Setiap foto Webb selalu bikin sadar seberapa luas semesta ini.', likes: 412 },
    { id: 2, name: 'Astro Photo', handle: '@astrophotos', avatar: 'AP', time: '1h', content: 'Detail galaksinya luar biasa. Ada link resolusi tingginya?', likes: 138 },
  ],
  5: [
    { id: 1, name: 'CSS Tinkerer', handle: '@csstinkerer', avatar: 'CT', time: '5h', content: 'Plugin Vite-nya kerasa banget lebih cepat waktu rebuild.', likes: 41 },
    { id: 2, name: 'UI Engineer', handle: '@uiengineer', avatar: 'UI', time: '4h', content: 'Utility class-nya masih paling enak buat jaga konsistensi UI.', likes: 27 },
  ],
  6: [
    { id: 1, name: 'DX Enthusiast', handle: '@dxenthusiast', avatar: 'DX', time: '7h', content: 'HMR Vite memang susah ditinggal kalau sudah terbiasa.', likes: 73 },
    { id: 2, name: 'Bundler Watch', handle: '@bundlerwatch', avatar: 'BW', time: '6h', content: 'Penasaran peningkatan build production-nya di app besar.', likes: 36 },
  ],
  7: [
    { id: 1, name: 'Runner Daily', handle: '@runnerdaily', avatar: 'RD', time: '25m', content: 'Ultraboost nyaman banget buat jalan jauh. Diskonnya sampai kapan?', likes: 15 },
    { id: 2, name: 'Sole Review', handle: '@solereview', avatar: 'SR', time: '18m', content: 'Kalau untuk lari santai oke, cushioning-nya empuk.', likes: 8 },
  ],
  101: [
    { id: 1, name: 'Code Buddy', handle: '@codebuddy', avatar: 'CB', time: '50m', content: 'Clean banget. Stack React + Tailwind memang enak buat prototyping cepat.', likes: 31 },
    { id: 2, name: 'Open Source ID', handle: '@opensourceid', avatar: 'OS', time: '35m', content: 'Drop link repo-nya dong, pengen lihat struktur komponennya.', likes: 22 },
  ],
  102: [
    { id: 1, name: 'Golden Hour', handle: '@goldenhour', avatar: 'GH', time: '2h', content: 'Warnanya cakep banget. Ini pakai kamera apa?', likes: 19 },
    { id: 2, name: 'Muhammad Kusuma', handle: '@muhammadkusuma', avatar: 'MK', time: '1h', content: 'Pakai kamera HP aja, kebetulan langitnya lagi bagus.', likes: 11 },
  ],
  103: [
    { id: 1, name: 'Web Notes', handle: '@webnotes', avatar: 'WN', time: '4h', content: 'Artikel seperti ini bagus buat reminder sebelum mulai refactor besar.', likes: 16 },
    { id: 2, name: 'Senior Dev', handle: '@seniordev', avatar: 'SD', time: '3h', content: 'Setuju. Praktik modern tetap harus disesuaikan dengan kebutuhan tim.', likes: 12 },
  ],
}

const getProfilePath = (handle = '') => (handle === '@muhammadkusuma' ? '/profile' : `/user/${handle.replace('@', '')}`)

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
  const postDetailReplies = postReplies[String(post?.id)] ?? replies

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
          <Link to={getProfilePath(post.handle)} onClick={(event) => event.stopPropagation()}>
            <Avatar value={post.avatar} />
          </Link>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 text-sm">
              <Link
                to={getProfilePath(post.handle)}
                onClick={(event) => event.stopPropagation()}
                className="font-bold text-gray-900 hover:underline"
              >
                {post.name}
              </Link>
              <Link
                to={getProfilePath(post.handle)}
                onClick={(event) => event.stopPropagation()}
                className="truncate text-gray-500 hover:underline"
              >
                {post.handle}
              </Link>
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
        {postDetailReplies.map((reply) => (
          <article key={reply.id} className="border-b border-gray-200 px-4 py-4">
            <div className="flex gap-3">
              <Link to={getProfilePath(reply.handle)}>
                <Avatar value={reply.avatar} />
              </Link>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1 text-sm">
                  <Link to={getProfilePath(reply.handle)} className="font-bold text-gray-900 hover:underline">
                    {reply.name}
                  </Link>
                  <Link to={getProfilePath(reply.handle)} className="truncate text-gray-500 hover:underline">
                    {reply.handle}
                  </Link>
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
