import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

function ImageModal({ isOpen, images, currentIndex, hasMultipleImages, onClose, onPrev, onNext, showStar, onStarClick }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative max-w-3xl w-[90%] mx-4" onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute -top-10 right-0 text-white hover:text-gray-300 text-sm font-medium"
          onClick={onClose}
        >
          ✕ Close
        </button>
        <img
          src={images[currentIndex]}
          alt={`Post image ${currentIndex + 1}`}
          className="w-full max-h-[70vh] object-contain rounded-xl"
        />
        {hasMultipleImages && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={onNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
            {/* Dots indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    idx === currentIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
        {/* Action buttons below modal image */}
        <div className="flex justify-center gap-8 mt-4">
          <button className="flex items-center gap-1 text-white hover:text-blue-400 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-sm">12</span>
          </button>
          <button className="flex items-center gap-1 text-white hover:text-green-400 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="text-sm">45</span>
          </button>
          <button className="flex items-center gap-1 text-white hover:text-pink-400 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-sm">234</span>
          </button>
          <button className="flex items-center gap-1 text-white hover:text-blue-400 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="text-sm">1.2K</span>
          </button>
          {showStar && (
            <button
              onClick={onStarClick}
              className="flex items-center gap-1 text-white hover:text-yellow-400 transition-colors"
            >
              <Star className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ImageModal