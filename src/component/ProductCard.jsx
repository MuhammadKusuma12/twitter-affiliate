import { useState, useEffect } from 'react'
import { ShoppingBag } from 'lucide-react'
import { usePosts } from '../context/PostsContext'

function ProductCard({ product, quantity, readOnly }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [qty, setQty] = useState(1)
  const [actionMessage, setActionMessage] = useState('')
  const [actionVisible, setActionVisible] = useState(false)
  const { addToCart } = usePosts()
  const stock = product?.stock ?? 50

  useEffect(() => {
    if (!actionVisible) return
    const timer = setTimeout(() => setActionVisible(false), 1800)
    return () => clearTimeout(timer)
  }, [actionVisible])

return (
    <>
      {/* Product Card Preview */}
      <div
        onClick={!readOnly ? (e) => {
          e.stopPropagation()
          setModalOpen(true)
          setQty(1)
        } : undefined}
        className={`mt-3 rounded-2xl border border-gray-200 overflow-hidden${readOnly ? '' : ' hover:shadow-md transition-shadow cursor-pointer'}`}
      >
        <div className="flex gap-3 p-3 bg-gray-50">
          {/* Product Image */}
          <div className="w-24 h-24 rounded-lg overflow-hidden bg-white border border-gray-200 flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="text-left">
              <div className="flex items-center gap-1">
                <ShoppingBag className="w-4 h-4 text-blue-500" />
                <span className="text-xs text-gray-600 truncate">Produk</span>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mt-1 truncate">{product.name}</h3>
              {product.marketplace && (
                <span className="text-sm font-medium text-blue-500">{product.marketplace}</span>
              )}
              {quantity > 1 && (
                <span className="text-xs text-gray-500 ml-1">×{quantity}</span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-blue-600 font-bold text-sm">{product.price}</span>
              {!readOnly && (
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold transition-colors">
                  {product.buttonText}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative bg-white rounded-xl shadow-xl w-[92%] max-w-2xl mx-4 overflow-hidden flex flex-col" style={{ maxHeight: '80vh' }}>
            {/* Close button */}
            <button
              className="absolute right-3 top-3 z-10 text-gray-500 hover:text-gray-700 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center"
              onClick={() => setModalOpen(false)}
            >
              ✕
            </button>

            {/* Scrollable content */}
            <div className="overflow-y-auto p-5">
              <div className="flex gap-5">
                {/* Left: Product Image - vertically centered */}
                <div className="w-[45%] flex-shrink-0 flex items-center">
                  <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-md" />
                </div>

                {/* Right: Product Details */}
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-black text-lg">{product.name}</h3>
                  {product.marketplace && (
                    <span className="text-sm font-medium text-blue-500">{product.marketplace}</span>
                  )}
                  <div className="text-blue-600 font-bold text-xl mt-1">{product.price}</div>
                  <div className="text-sm text-gray-600 mt-3">
                    {product.description ?? 'Sepatu sneakers dengan teknologi terbaru untuk kenyamanan maksimal.'}
                  </div>

                  <div className="mt-4 border-t border-gray-100 pt-4">
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
                          onClick={() => setQty((q) => Math.min(stock, q + 1))}
                          className="w-8 h-8 rounded-md border border-gray-200 flex items-center justify-center text-black"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        addToCart({ ...product, quantity: qty })
                        setActionMessage(`🛒 Menambahkan ${qty} ${product.name} ke keranjang`)
                        setActionVisible(true)
                        setModalOpen(false)
                      }}
                      className="flex-1 bg-black text-white py-2 rounded-md text-sm font-semibold"
                    >
                      🛒 Keranjang
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        addToCart({ ...product, quantity: qty })
                        setActionMessage(`🛍️ Membeli ${qty} ${product.name}`)
                        setActionVisible(true)
                        setModalOpen(false)
                      }}
                      className="flex-1 border border-gray-200 text-black py-2 rounded-md text-sm font-semibold"
                    >
                      Beli
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast notification */}
      <div className={`fixed right-4 bottom-4 z-60 max-w-sm rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl shadow-black/10 transition-all duration-300 ${actionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500 text-white text-lg">✓</div>
          <div>
            <p className="text-sm font-semibold text-black">{actionMessage}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductCard