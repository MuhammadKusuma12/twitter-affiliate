import { useState } from 'react'

function Topbar() {
  const [activeTab, setActiveTab] = useState('for-you')

  return (
    <div className="sticky top-0 bg-white/80 backdrop-blur border-b border-gray-200 z-10">
      {/* Tab menu: For you & Following */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('for-you')}
          className={`flex-1 py-3 text-sm font-medium relative transition-colors ${
            activeTab === 'for-you' ? 'text-black' : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          For you
          {activeTab === 'for-you' && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-blue-500 rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('following')}
          className={`flex-1 py-3 text-sm font-medium relative transition-colors ${
            activeTab === 'following' ? 'text-black' : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          Following
          {activeTab === 'following' && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-blue-500 rounded-full" />
          )}
        </button>
      </div>
    </div>
  )
}

export default Topbar