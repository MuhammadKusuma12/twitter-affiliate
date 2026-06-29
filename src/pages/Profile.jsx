import { Link } from 'react-router-dom'
import { ArrowLeft, Calendar } from 'lucide-react'
import PostCard from '../component/PostCard'

function Profile() {
  const profilePosts = [
    {
      id: 3,
      own: true,
      name: 'Pengguna Saat Ini',
      handle: '@penggunasaatini',
      avatar: 'PS',
      time: '1h',
      content: 'Baru saja dapat sepatu baru! Kualitasnya luar biasa, sangat nyaman dipakai 😍',
      images: [],
      product: {
        name: 'Nike Air Max 270',
        price: 'Rp 1.299.000',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
        buttonText: 'Beli Sekarang',
      },
      comments: 12,
      retweets: 45,
      likes: 234,
      views: '5.4K',
    },
    {
      id: 2,
      own: true,
      name: 'Pengguna Saat Ini',
      handle: '@penggunasaatini',
      avatar: 'PS',
      time: '22 Jun',
      content: 'Lagi nyobain kafe baru di sudut kota. Kopinya enak banget, tempatnya cozy! 🧋',
      images: [
        'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
      ],
      comments: 7,
      retweets: 14,
      likes: 89,
      views: '2.1K',
    },
    {
      id: 1,
      own: true,
      name: 'Pengguna Saat Ini',
      handle: '@penggunasaatini',
      avatar: 'PS',
      time: '4h',
      content: 'Akhirnya upgrade kamera! Foto-foto jadi lebih tajam dan detail. Fotografer pemula wajib punya ini! 📷',
      images: [],
      product: {
        name: 'Canon EOS R6',
        price: 'Rp 35.999.000',
        image: 'https://doss.co.id/cdn/shop/files/1781150285.jpg?v=1781150328',
        buttonText: 'Beli Sekarang',
      },
      comments: 23,
      retweets: 67,
      likes: 345,
      views: '8.9K',
    },
    {
      id: 0,      own: true,      name: 'Pengguna Saat Ini',
      handle: '@penggunasaatini',
      avatar: 'PS',
      time: '1m',
      content: 'Night ride lets goo! Udara segar, jalanan sepi. Sempurna banget buat olahraga 🚴',
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTum9gv1-wk2lYVCCgv_3wKoI65yidvlpV3281SqgIEbGJ4jkPReAULBp4T&s=10',
      ],
      comments: 11,
      retweets: 28,
      likes: 156,
      views: '4.3K',
    },
  ]

  const affiliateProducts = profilePosts
    .filter((post) => post.product)
    .map((post) => ({
      name: post.product.name,
      price: post.product.price,
      image: post.product.image,
      buttonText: post.product.buttonText,
    }))

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="relative">
        <div className="h-52 bg-gradient-to-r from-sky-500 via-violet-500 to-fuchsia-500" />
        <div className="absolute top-4 left-4">
          <Link
            to="/"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm transition hover:bg-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
        <div className="absolute top-4 right-4">
          <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50">
            Edit Profil
          </button>
        </div>
        <div className="absolute -bottom-14 left-6">
          <div className="h-28 w-28 rounded-full border-4 border-white bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
            PS
          </div>
        </div>
      </div>

      <div className="pt-20 px-3 pb-10">
        <div className="flex flex-col gap-2 text-left">
          <div className="text-m font-bold text-slate-950">Pengguna Saat Ini</div>
          <div className="text-sm text-slate-500">@penggunasaatini</div>
          <div className="text-sm text-slate-700 max-w-2xl leading-6">
            Pengguna aktif platform X. Suka berbagi tentang teknologi dan gaya hidup.
          </div>
          <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500">
            <div className="inline-flex items-center gap-2 text-xs text-slate-500">
              <Calendar className="w-3 h-3" />
              Bergabung Januari 2020
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500">
            <div className="inline-flex items-center gap-2">
              <span className="font-semibold text-slate-900">234</span>
              Mengikuti
            </div>
            <div className="inline-flex items-center gap-2">
              <span className="font-semibold text-slate-900">1.2K</span>
              Pengikut
            </div>
          </div>
        </div>

        <div className="mt-8 border-b border-slate-200">
          <div className="flex gap-10 text-sm font-semibold text-slate-600">
            <button className="border-b-2 border-blue-500 pb-4 text-slate-900">Tweet</button>
            <button className="pb-4 hover:text-slate-900">Tweet & Balasan</button>
            <button className="pb-4 hover:text-slate-900">Media</button>
            <button className="pb-4 hover:text-slate-900">Suka</button>
          </div>
        </div>

        <div className="-mx-6">
          {profilePosts.map((post) => (
            <div key={post.id} className="px-3">
              <PostCard post={post} affiliateProducts={affiliateProducts} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
