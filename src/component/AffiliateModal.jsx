import { useState } from 'react'
import { Search, X } from 'lucide-react'

const affiliateProducts = [
  {
    id: 1,
    name: 'Nike Air Max 270',
    price: 'Rp 2.500.000',
    image: 'https://picsum.photos/seed/shoe1/200/200',
    commission: 'Rp 125.000',
    buttonText: 'Lihat',
    marketplace: 'Shopee',
  },
  {
    id: 2,
    name: 'Sony WH-1000XM5',
    price: 'Rp 3.200.000',
    image: 'https://picsum.photos/seed/headphone1/200/200',
    commission: 'Rp 160.000',
    buttonText: 'Lihat',
    marketplace: 'Tokopedia',
  },
  {
    id: 3,
    name: 'MacBook Pro M3',
    price: 'Rp 25.000.000',
    image: 'https://picsum.photos/seed/laptop1/200/200',
    commission: 'Rp 1.250.000',
    buttonText: 'Lihat',
    marketplace: 'Blibli',
  },
  {
    id: 4,
    name: 'Samsung Galaxy S24',
    price: 'Rp 12.000.000',
    image: 'https://picsum.photos/seed/phone1/200/200',
    commission: 'Rp 600.000',
    buttonText: 'Lihat',
    marketplace: 'Shopee',
  },
  {
    id: 5,
    name: 'Adidas Ultraboost',
    price: 'Rp 2.800.000',
    image: 'https://picsum.photos/seed/shoe2/200/200',
    commission: 'Rp 140.000',
    buttonText: 'Lihat',
    marketplace: 'Tokopedia',
  },
  {
    id: 6,
    name: 'iPad Air M2',
    price: 'Rp 8.500.000',
    image: 'https://picsum.photos/seed/tablet1/200/200',
    commission: 'Rp 425.000',
    buttonText: 'Lihat',
    marketplace: 'Blibli',
  },
]

function AffiliateModal({ isOpen, onClose, onSelect }) {
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState(null)

  const filteredProducts = affiliateProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (product) => {
    // Toggle: if already selected, deselect; otherwise select
    setSelectedId(selectedId === product.id ? null : product.id)
  }

  const handleDone = () => {
    if (selectedId) {
      const product = affiliateProducts.find((p) => p.id === selectedId)
      onSelect(product)
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className="relative bg-white rounded-xl shadow-xl w-[92%] max-w-lg mx-4 flex flex-col"
        style={{ maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-black">Pilih Produk Affiliate</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-5 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari produk..."
              className="w-full bg-gray-100 rounded-lg py-2.5 pl-10 pr-4 text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white border border-transparent"
            />
          </div>
        </div>

        {/* Product List */}
        <div className="flex-1 overflow-y-auto px-5 pb-3">
          <div className="space-y-2">
            {filteredProducts.map((product) => {
              const isSelected = selectedId === product.id
              return (
                <div
                  key={product.id}
                  onClick={() => handleSelect(product)}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {/* Radio circle */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected ? 'border-blue-500' : 'border-gray-300'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    )}
                  </div>

                  {/* Product Image */}
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0 text-left">
                    <h3 className="text-sm font-semibold text-black truncate">{product.name}</h3>
                    <p className="text-xs text-gray-500">{product.price}</p>
                    <p className="text-xs text-gray-400">{product.marketplace}</p>
                    <p className="text-xs text-green-600 font-medium">Komisi: {product.commission}</p>
                  </div>
                </div>
              )
            })}
            {filteredProducts.length === 0 && (
              <div className="py-8 text-center text-gray-500 text-sm">
                Produk tidak ditemukan
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-200">
          <button
            onClick={handleDone}
            disabled={!selectedId}
            className="w-full bg-black text-white py-3 rounded-xl font-bold text-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {selectedId ? 'Selesai' : 'Pilih produk'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AffiliateModal