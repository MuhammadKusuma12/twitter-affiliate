import { useState } from 'react'
import { ShoppingCart, Package, CreditCard } from 'lucide-react'
import { usePosts } from '../context/PostsContext'
import ProductCard from '../component/ProductCard'

function Shopping() {
  const [activeTab, setActiveTab] = useState('cart')
  const { cartItems, purchasedItems, purchaseCart } = usePosts()

  const tabs = [
    { key: 'cart', label: 'Cart', icon: ShoppingCart },
    { key: 'purchased', label: 'Purchased', icon: Package },
  ]

  const groupByMarketplace = (items) => {
    return items.reduce((acc, item) => {
      const marketplace = item.product.marketplace || 'Other'
      if (!acc[marketplace]) acc[marketplace] = []
      acc[marketplace].push(item)
      return acc
    }, {})
  }

  const calculateMarketplaceTotal = (items) => {
    return items.reduce((total, item) => {
      const priceNum = parseInt(item.product.price.replace(/[^0-9]/g, ''))
      const qty = item.quantity || 1
      return total + priceNum * qty
    }, 0)
  }

  const formatPrice = (num) => {
    return 'Rp ' + num.toLocaleString('id-ID')
  }

  const handleCheckout = (marketplace, items) => {
    const total = calculateMarketplaceTotal(items)
    alert(`Checkout at ${marketplace} - Total: ${formatPrice(total)}`)
    purchaseCart()
  }

  return (
    <div>
      {/* Header */}
      <div className="px-3 py-3 border-b border-gray-200">
        <h1 className="text-xl font-extrabold text-black">Shopping</h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-4 text-sm font-medium relative transition-colors ${
              activeTab === tab.key ? 'text-black' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </div>
            {activeTab === tab.key && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-blue-500 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Cart Tab */}
      {activeTab === 'cart' && (
        <div>
          {cartItems.length > 0 ? (
            <div className="p-3">
              <div className="bg-gray-50 rounded-xl p-3 mb-3">
                <p className="text-sm text-gray-600 mb-2">Shipping Address: Jakarta, Indonesia</p>
              </div>

              {Object.entries(groupByMarketplace(cartItems)).map(([marketplace, items]) => (
                <div key={marketplace} className="border border-gray-200 rounded-xl mb-3 overflow-hidden">
                  {/* Marketplace Header */}
                  <div className="bg-gray-50 px-3 py-2 border-b border-gray-200">
                    <h3 className="font-semibold text-black text-sm">{marketplace}</h3>
                  </div>

                  {/* Products */}
                  <div className="p-3">
                    {items.map((item) => (
                      <ProductCard key={`${item.product.id}-${item.quantity}`} product={item.product} />
                    ))}
                  </div>

                  {/* Checkout per Marketplace */}
                  <div className="border-t border-gray-200 px-3 py-3 bg-gray-50">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm">Marketplace Total</span>
                      <span className="font-bold text-blue-500 text-sm">{formatPrice(calculateMarketplaceTotal(items))}</span>
                    </div>
                    <button
                      onClick={() => handleCheckout(marketplace, items)}
                      className="w-full mt-2 bg-blue-500 text-white font-bold py-2 rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <CreditCard className="w-3 h-3" />
                      Checkout at {marketplace}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-500 text-sm">
              Your cart is empty
            </div>
          )}
        </div>
      )}

      {/* Purchased Tab */}
      {activeTab === 'purchased' && (
        <div>
          {purchasedItems.length > 0 ? (
            <div className="p-3">
              {Object.entries(groupByMarketplace(purchasedItems)).map(([marketplace, items]) => (
                <div key={marketplace} className="border border-gray-200 rounded-xl mb-3 overflow-hidden">
                  <div className="bg-gray-50 px-3 py-2 border-b border-gray-200">
                    <h3 className="font-semibold text-black text-sm">{marketplace}</h3>
                  </div>
                  <div className="p-3">
                    {items.map((item) => (
                      <ProductCard key={`${item.product.id}-${item.quantity}`} product={item.product} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-500 text-sm">
              No purchased products yet
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Shopping