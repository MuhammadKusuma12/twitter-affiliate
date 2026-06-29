import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ShoppingBag, MoreHorizontal, Star } from 'lucide-react'

function PostCard({ post, affiliateProducts = [] }) {
  const [currentImage, setCurrentImage] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [affiliateSubmenuOpen, setAffiliateSubmenuOpen] = useState(false)
  const [affiliationMenuOpen, setAffiliationMenuOpen] = useState(false)
  const [selectedAffiliateIndex, setSelectedAffiliateIndex] = useState(0)
  const [selectedAffiliateProduct, setSelectedAffiliateProduct] = useState(null)
  const [mainAffiliateProduct, setMainAffiliateProduct] = useState(null)
  const [activeModalProduct, setActiveModalProduct] = useState(null)
  const [affiliateAddSelectionOpen, setAffiliateAddSelectionOpen] = useState(false)
  const [selectedAffiliateToAdd, setSelectedAffiliateToAdd] = useState(null)
  const [affiliateChoices, setAffiliateChoices] = useState(() => {
    const baseProducts =
      post.affiliateProducts?.length > 0
        ? post.affiliateProducts
        : affiliateProducts.length > 0
        ? affiliateProducts
        : post.product
        ? [{ name: post.product.name, price: post.product.price, image: post.product.image }]
        : []

    return baseProducts
  })
  const [qty, setQty] = useState(1)
  const [actionMessage, setActionMessage] = useState('')
  const [actionVisible, setActionVisible] = useState(false)
  const stock = post.product?.stock ?? 50
  const hasMultipleImages = post.images && post.images.length > 1
  const showAffiliationMenu = post.own
  const showImageAffiliation = post.images && post.images.length > 0
  const showImageAffiliationControls = showImageAffiliation && !affiliationMenuOpen
  const affiliationOptions = affiliateChoices
  const displayProduct = mainAffiliateProduct ?? post.product
  const modalProduct = activeModalProduct
  const modalStock = modalProduct?.stock ?? displayProduct?.stock ?? 50
  const affiliateAddOptions = [
    {
      name: 'Gitar',
      price: 'Rp 1.250.000',
      image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80',
      description: 'Gitar akustik premium untuk pemula dan profesional.'
    },
    {
      name: 'Sepeda',
      price: 'Rp 2.400.000',
      image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80',
      description: 'Sepeda urban ringan dan nyaman untuk perjalanan harian.'
    }
  ]

  useEffect(() => {
    if (!actionVisible) return
    const timer = setTimeout(() => setActionVisible(false), 1800)
    return () => clearTimeout(timer)
  }, [actionVisible])

  const prevImage = (e) => {
    e.stopPropagation()
    setCurrentImage((prev) => (prev === 0 ? post.images.length - 1 : prev - 1))
  }

  const nextImage = (e) => {
    e.stopPropagation()
    setCurrentImage((prev) => (prev === post.images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="w-full py-3 border-b border-gray-200 bg-white hover:bg-gray-50 cursor-pointer transition-colors">
      <div className="px-3 flex gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
          {post.avatar}
          </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 min-w-0">
              <span className="font-bold text-gray-900 truncate">{post.name}</span>
              <span className="text-gray-500 truncate">{post.handle}</span>
              <span className="text-gray-500">·</span>
              <span className="text-gray-500 whitespace-nowrap">{post.time}</span>
            </div>
            <div className="flex items-center gap-2">
              {showAffiliationMenu && (
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setMenuOpen((open) => {
                        const next = !open
                        if (!next) setAffiliateSubmenuOpen(false)
                        return next
                      })
                    }}
                    className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                  {menuOpen && (
                  <div className="absolute right-0 top-10 z-50 w-72 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
                    {!affiliateSubmenuOpen ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setAffiliateSubmenuOpen(true)
                        }}
                        className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-slate-50 transition"
                      >
                        Afiliasi
                      </button>
                    ) : (
                      <>
                        <div className="flex items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          <span>Pilih produk afiliasi</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setAffiliateSubmenuOpen(false)
                            }}
                            className="text-blue-500 hover:text-blue-600"
                          >
                            Kembali
                          </button>
                        </div>
                        <div className="divide-y divide-gray-100">
                          {affiliationOptions.map((option, idx) => (
                            <button
                              key={option.name}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedAffiliateIndex(idx)
                                setSelectedAffiliateProduct(option)
                              }}
                              className={`w-full px-4 py-3 text-left text-sm transition ${
                                selectedAffiliateIndex === idx ? 'bg-slate-50' : 'hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span>{option.name}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-slate-500">{option.price}</span>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                        <div className="space-y-2 border-t border-gray-100 px-4 py-4">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setMenuOpen(false)
                              setAffiliateSubmenuOpen(false)
                              const option = affiliationOptions[selectedAffiliateIndex]
                              if (option) {
                                setMainAffiliateProduct(option)
                                setActionMessage(`⭐ ${option.name} (${option.price}) dipilih sebagai produk afiliasi`)
                                setActionVisible(true)
                              }
                            }}
                            className="w-full rounded-xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-600 transition"
                          >
                            Pilih Produk Afiliasi
                          </button>
                          {!affiliateAddSelectionOpen ? (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                setAffiliateAddSelectionOpen(true)
                                setSelectedAffiliateToAdd(null)
                              }}
                              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                            >
                              Tambah Afiliasi
                            </button>
                          ) : (
                            <div className="space-y-2 rounded-xl border border-gray-200 bg-slate-50 p-3">
                              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Pilih produk yang ingin ditambahkan
                              </div>
                              {affiliateAddOptions.map((product) => (
                                <button
                                  key={product.name}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedAffiliateToAdd(product)
                                  }}
                                  className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition ${
                                    selectedAffiliateToAdd?.name === product.name
                                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                                      : 'border-gray-200 bg-white text-slate-700 hover:bg-slate-100'
                                  }`}
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <span>{product.name}</span>
                                    <span className="text-xs text-slate-500">{product.price}</span>
                                  </div>
                                </button>
                              ))}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  if (!selectedAffiliateToAdd) return
                                  setAffiliateChoices((prev) => {
                                    const next = [...prev]
                                    const existingNames = new Set(next.map((item) => item.name.toLowerCase()))
                                    if (!existingNames.has(selectedAffiliateToAdd.name.toLowerCase())) {
                                      next.push(selectedAffiliateToAdd)
                                    }
                                    return next
                                  })
                                  setAffiliateAddSelectionOpen(false)
                                  setSelectedAffiliateToAdd(null)
                                  setActionMessage(`➕ ${selectedAffiliateToAdd.name} ditambahkan ke daftar afiliasi`)
                                  setActionVisible(true)
                                }}
                                disabled={!selectedAffiliateToAdd}
                                className="w-full rounded-xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-300"
                              >
                                Tambahkan Produk
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setAffiliateAddSelectionOpen(false)
                                  setSelectedAffiliateToAdd(null)
                                }}
                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                              >
                                Batal
                              </button>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <p className="text-gray-900 mt-0.5 text-[15px] leading-5 text-left">{post.content}</p>

          {/* Product Card */}
          {displayProduct && !showImageAffiliation && (
            <>
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveModalProduct(displayProduct)
                  setModalOpen(true)
                  setQty(1)
                }}
                className="mt-3 rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex gap-3 p-3 bg-white">
                  {/* Product Image */}
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-white border border-gray-200 flex-shrink-0">
                    <img
                      src={displayProduct.image}
                      alt={displayProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1">
                        <ShoppingBag className="w-4 h-4 text-blue-500" />
                        <span className="text-xs text-gray-600 truncate">Produk</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm mt-1 truncate">{displayProduct.name}</h3>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-600 font-bold text-sm">{displayProduct.price}</span>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold transition-colors">
                        {displayProduct.buttonText ?? 'Beli Sekarang'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </>
          )}

          {/* Images */}
          {post.images && post.images.length > 0 && (
            <>
              <div className="relative mt-3 rounded-2xl overflow-hidden border border-gray-200">
                <img
                  src={post.images[currentImage]}
                  alt={`Post image ${currentImage + 1}`}
                  className="w-full h-72 object-cover bg-gray-100"
                />
                {showImageAffiliationControls && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setAffiliationMenuOpen((open) => !open)
                    }}
                    className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-blue-600 shadow-sm hover:bg-white"
                  >
                    <Star className="h-4 w-4" />
                  </button>
                )}
                {showImageAffiliationControls && selectedAffiliateProduct && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveModalProduct(selectedAffiliateProduct)
                      setModalOpen(true)
                      setQty(1)
                    }}
                    className="absolute left-3 top-3 z-20 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/90 px-3 py-1.5 text-sm font-semibold text-blue-600 shadow-sm backdrop-blur-sm hover:bg-white"
                  >
                    <Star className="h-4 w-4" />
                    <span>Terafiliasi</span>
                  </button>
                )}
                {showImageAffiliation && affiliationMenuOpen && (
                  <div className="absolute right-3 top-3 z-50 w-[min(18rem,calc(100%-1.5rem))] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
                        <div className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Pilih produk afiliasi
                        </div>
                        <div className="divide-y divide-gray-100">
                          {affiliationOptions.map((option, idx) => (
                            <button
                              key={option.name}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedAffiliateIndex(idx)
                              }}
                              className={`w-full px-4 py-3 text-left text-sm transition ${
                                selectedAffiliateIndex === idx ? 'bg-slate-50' : 'hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span>{option.name}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-slate-500">{option.price}</span>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                        <div className="px-4 py-3">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setAffiliationMenuOpen(false)
                              const option = affiliationOptions[selectedAffiliateIndex]
                              if (option) {
                                setSelectedAffiliateProduct(option)
                                setActionMessage(`⭐ ${option.name} (${option.price}) dipilih sebagai produk afiliasi`)
                                setActionVisible(true)
                              }
                            }}
                            className="w-full rounded-xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-600 transition"
                          >
                            Pilih Produk Afiliasi
                          </button>
                        </div>
                  </div>
                )}
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                    {/* Dots indicator */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {post.images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            idx === currentImage ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              {displayProduct && (
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveModalProduct(displayProduct)
                    setModalOpen(true)
                    setQty(1)
                  }}
                  className="mt-3 rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex gap-3 p-3 bg-white">
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-white border border-gray-200 flex-shrink-0">
                      <img
                        src={displayProduct.image}
                        alt={displayProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1">
                          <ShoppingBag className="w-4 h-4 text-blue-500" />
                          <span className="text-xs text-gray-600 truncate">Produk</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 text-sm mt-1 truncate">{displayProduct.name}</h3>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-600 font-bold text-sm">{displayProduct.price}</span>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold transition-colors">
                          {displayProduct.buttonText ?? 'Beli Sekarang'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {modalOpen && modalProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setModalOpen(false)}
              />
              <div className="relative bg-white rounded-xl shadow-xl w-[92%] max-w-2xl mx-4 overflow-hidden">
                <button
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                  onClick={() => setModalOpen(false)}
                >
                  ✕
                </button>
                <div className="p-5">
                  <div className="grid grid-cols-2 gap-3">
                    <img src={modalProduct.image} alt={modalProduct.name} className="w-full h-100 object-cover rounded-md col-span-2" />
                  </div>
                  <div className="mt-4">
                    <h3 className="font-bold text-black">{modalProduct.name}</h3>
                    <div className="text-blue-600 font-bold text-xl mt-1">{modalProduct.price}</div>
                    <div className="text-sm text-gray-600 mt-3">{modalProduct.description ?? 'Sepatu sneakers dengan teknologi terbaru untuk kenyamanan maksimal.'}</div>
                    <div className="text-sm text-gray-500 mt-3">Stok tersedia: {modalStock}</div>

                    <div className="mt-4 border-t border-gray-100 pt-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-sm text-black">Jumlah:</div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setQty((q) => Math.max(1, q - 1))}
                            className="w-8 h-8 rounded-md border border-gray-200 flex items-center justify-center text-black"
                          >
                            -
                          </button>
                          <div className="w-8 text-center text-black">{qty}</div>
                          <button
                            onClick={() => setQty((q) => Math.min(modalStock, q + 1))}
                            className="w-8 h-8 rounded-md border border-gray-200 flex items-center justify-center text-black "
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex-1" />
                    </div>

                    <div className="mt-4 space-y-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setActionMessage(`🛒 Menambahkan ${qty} ${modalProduct.name} ke keranjang`)
                          setActionVisible(true)
                          setModalOpen(false)
                        }}
                        className="w-full bg-black text-white py-3 rounded-md font-semibold"
                      >
                        🛒 Tambah ke Keranjang
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setActionMessage(`🛍️ Membeli ${qty} ${modalProduct.name}`)
                          setActionVisible(true)
                          setModalOpen(false)
                        }}
                        className="w-full border border-gray-200 text-black py-3 rounded-md font-semibold"
                      >
                        Beli Sekarang
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between mt-3 max-w-md">
            <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors group">
              <div className="p-1.5 rounded-full group-hover:bg-blue-50">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <span className="text-xs">{post.comments}</span>
            </button>
            <button className="flex items-center gap-1 text-gray-500 hover:text-green-500 transition-colors group">
              <div className="p-1.5 rounded-full group-hover:bg-green-50">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <span className="text-xs">{post.retweets}</span>
            </button>
            <button className="flex items-center gap-1 text-gray-500 hover:text-pink-500 transition-colors group">
              <div className="p-1.5 rounded-full group-hover:bg-pink-50">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-xs">{post.likes}</span>
            </button>
            <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors group">
              <div className="p-1.5 rounded-full group-hover:bg-blue-50">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <span className="text-xs">{post.views}</span>
            </button>
          </div>
        </div>
      </div>
      <div className={`fixed right-4 bottom-4 z-60 max-w-sm rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl shadow-black/10 transition-all duration-300 ${actionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500 text-white text-lg">✓</div>
          <div>
            <p className="text-sm font-semibold text-black">{actionMessage}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard
