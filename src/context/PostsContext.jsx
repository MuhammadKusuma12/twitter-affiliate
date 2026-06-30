import { createContext, useContext, useState, useCallback } from 'react'

const PostsContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const usePosts = () => {
  const context = useContext(PostsContext)
  if (!context) {
    throw new Error('usePosts must be used within PostsProvider')
  }
  return context
}

export function PostsProvider({ children }) {
  const [profilePosts, setProfilePosts] = useState([
    {
      id: 101,
      name: 'Muhammad Kusuma',
      handle: '@muhammadkusuma',
      avatar: 'MK',
      time: '1h',
      content: 'Just finished building this Twitter clone with React and Tailwind CSS! 🚀\n\nCheck out the source code on my GitHub.',
      images: [
        'https://picsum.photos/seed/code/600/400',
      ],
      comments: 23,
      retweets: 89,
      likes: 456,
      views: '3.2K',
    },
    {
      id: 102,
      name: 'Muhammad Kusuma',
      handle: '@muhammadkusuma',
      avatar: 'MK',
      time: '3h',
      content: 'Beautiful sunset today! 🌅',
      images: [
        'https://picsum.photos/seed/sunset/600/400',
        'https://picsum.photos/seed/sunset2/600/400',
      ],
      comments: 12,
      retweets: 34,
      likes: 234,
      views: '1.8K',
    },
    {
      id: 103,
      name: 'Muhammad Kusuma',
      handle: '@muhammadkusuma',
      avatar: 'MK',
      time: '5h',
      content: 'Great article on modern web development practices. A must-read for every developer! 📖',
      images: [],
      comments: 8,
      retweets: 56,
      likes: 178,
      views: '2.1K',
    },
  ])

  const [homePosts, setHomePosts] = useState([
    {
      id: 0,
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
    {
      id: 1,
      name: 'Pengguna Saat Ini',
      handle: '@pengggunasatini',
      avatar: 'PS',
      time: '1h',
      content: 'Baru saja dapat sepatu baru! Kualitasnya luar biasa, sangat nyaman dipakai 👟',
      images: [],
      product: {
        name: 'Nike Air Max 270',
        price: 'Rp 1.299.000',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
        buttonText: 'Beli Sekarang',
        marketplace: 'Shopee'
      },
      comments: 12,
      retweets: 45,
      likes: 234,
      views: '5.4K',
    },
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
    {
      id: 7,
      name: 'Toko Sepatu Bagus',
      handle: '@tokosepatu',
      avatar: 'TS',
      time: '30m',
      content: 'Diskon akhir pekan! Dapatkan Adidas Ultraboost terbaru dengan potongan 20% — nyaman untuk lari dan gaya sehari-hari 👟',
      images: [],
      product: {
        name: 'Adidas Ultraboost',
        price: 'Rp 1.499.000',
        image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/b67ceb1624ec469b9437c59c73beac9d_9366/Sepatu_Ultraboost_1.0_Hitam_HQ4206_HM10.jpg',
        buttonText: 'Beli Sekarang',
        marketplace: 'Tokopedia'
      },
      comments: 8,
      retweets: 14,
      likes: 98,
      views: '2.1K',
    },
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
  ])

  const [cartItems, setCartItems] = useState([])
  const [purchasedItems, setPurchasedItems] = useState([])

  const addAffiliateToPost = useCallback((postId, product, imageIndex = 0) => {
    setProfilePosts(prev => prev.map(p => {
      if (p.id === postId) {
        if (p.images && p.images.length > 0) {
          return {
            ...p,
            imageProducts: {
              ...(p.imageProducts || {}),
              [imageIndex]: { ...product, buttonText: 'Beli Sekarang' }
            }
          }
        } else {
          return { ...p, product: { ...product, buttonText: 'Beli Sekarang' } }
        }
      }
      return p
    }))

    setHomePosts(prev => prev.map(p => {
      if (p.id === postId) {
        if (p.images && p.images.length > 0) {
          return {
            ...p,
            imageProducts: {
              ...(p.imageProducts || {}),
              [imageIndex]: { ...product, buttonText: 'Beli Sekarang' }
            }
          }
        } else {
          return { ...p, product: { ...product, buttonText: 'Beli Sekarang' } }
        }
      }
      return p
    }))
  }, [])

  const addToCart = useCallback((product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }, [])

  const purchaseCart = useCallback(() => {
    setPurchasedItems(prev => [...prev, ...cartItems])
    setCartItems([])
  }, [cartItems])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  const getPostById = useCallback((id) => {
    return [...profilePosts, ...homePosts].find(p => String(p.id) === String(id))
  }, [profilePosts, homePosts])

  return (
    <PostsContext.Provider value={{
      profilePosts,
      homePosts,
      cartItems,
      purchasedItems,
      setCartItems,
      setPurchasedItems,
      addAffiliateToPost,
      addToCart,
      purchaseCart,
      clearCart,
      getPostById
    }}>
      {children}
    </PostsContext.Provider>
  )
}
