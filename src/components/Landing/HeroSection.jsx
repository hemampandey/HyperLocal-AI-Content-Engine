/**
 * HeroSection - Landing page hero section for Indian shopkeepers
 * @param {Object} props
 * @param {string} props.headline - Main headline text
 * @param {string} props.subheadline - Subheadline text (optional)
 * @param {string} props.ctaText - CTA button text
 * @param {Function} props.onCtaClick - CTA button click handler
 */
export default function HeroSection({ 
  headline = "Apni Dukaan Ko Digital Banao",
  subheadline = "Local customers ko reach karein, sales badhayen",
  ctaText = "Shuru Karein",
  onCtaClick 
}) {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      {/* Headline */}
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
          {headline}
          <span className="block text-indigo-600 mt-2">
            Hyperlocal Advertising
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mt-6">
          {subheadline}
        </p>
      </div>

      {/* 3-Step Visual Flow: Product → City → Ad Ready */}
      <div className="max-w-4xl mx-auto mb-12 md:mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {/* Step 1: Product */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-indigo-100 rounded-full flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-indigo-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 md:w-10 md:h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
              </div>
              <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-indigo-200 transform -translate-y-1/2"></div>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
              Product
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Apna product details share karein
            </p>
          </div>

          {/* Step 2: City */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-indigo-100 rounded-full flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-indigo-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 md:w-10 md:h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-indigo-200 transform -translate-y-1/2"></div>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
              City
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Apna sheher select karein
            </p>
          </div>

          {/* Step 3: Ad Ready */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-indigo-100 rounded-full flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-indigo-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 md:w-10 md:h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
              Ad Ready
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Ad tayar ho jayega
            </p>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      {onCtaClick && (
        <div className="text-center">
          <button
            onClick={onCtaClick}
            className="font-semibold py-4 px-8 md:py-5 md:px-12 rounded-lg text-lg md:text-xl shadow-lg transition-all duration-300 bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-xl transform hover:scale-105 cursor-pointer"
          >
            {ctaText}
          </button>
        </div>
      )}
    </div>
  )
}
