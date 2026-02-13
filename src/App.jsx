import './App.css'
import { useState, useRef, useEffect } from 'react'
import { getAllCities, getLanguageForCity } from './data/cityLanguageMap'
import { submitCampaign } from './services/api'

function App() {
  const [productName, setProductName] = useState('')
  const [productCategory, setProductCategory] = useState('')
  const [businessType, setBusinessType] = useState('retail')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [citySearchQuery, setCitySearchQuery] = useState('')
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false)
  const [offer, setOffer] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [activeTab, setActiveTab] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [copiedText, setCopiedText] = useState('')
  const [apiResponse, setApiResponse] = useState(null)
  const cityDropdownRef = useRef(null)

  const loadingSteps = [
    { text: 'Analyzing your product details...', duration: 2000 },
    { text: 'Optimizing for local audience...', duration: 2000 },
    { text: 'Generating ad content...', duration: 2500 },
    { text: 'Finalizing your campaign...', duration: 1500 },
  ]

  const allCities = getAllCities()
  const filteredCities = citySearchQuery
    ? allCities.filter((city) =>
        city.toLowerCase().includes(citySearchQuery.toLowerCase())
      )
    : allCities

  const handleCitySelect = (city) => {
    setSelectedCity(city)
    const language = getLanguageForCity(city)
    setSelectedLanguage(language)
    setCitySearchQuery('')
    setIsCityDropdownOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cityDropdownRef.current &&
        !cityDropdownRef.current.contains(event.target)
      ) {
        setIsCityDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Validate required fields
  const isFormValid = () => {
    return (
      productName.trim() !== '' &&
      selectedCity !== '' &&
      productCategory !== ''
    )
  }

  // Copy to clipboard function
  const copyToClipboard = async (text, label = '') => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(label || 'Text')
      setTimeout(() => setCopiedText(''), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        setCopiedText(label || 'Text')
        setTimeout(() => setCopiedText(''), 2000)
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr)
      }
      document.body.removeChild(textArea)
    }
  }

  // Generate formatted form summary
  const generateFormSummary = () => {
    const categoryLabels = {
      'food-beverage': 'Food & Beverages',
      fashion: 'Fashion & Accessories',
      services: 'Local Services',
      'health-beauty': 'Health & Beauty',
      electronics: 'Electronics & Gadgets',
      other: 'Other',
    }

    const businessTypeLabels = {
      retail: 'Retail Store',
      online: 'Online Only',
      hybrid: 'Online + Store',
    }

    return `Hyperlocal Ad Campaign Details

Product Name: ${productName}
Category: ${categoryLabels[productCategory] || productCategory}
Business Type: ${businessTypeLabels[businessType] || businessType}
City: ${selectedCity}
Language: ${selectedLanguage}
${offer ? `Special Offer: ${offer}` : ''}

Generated on: ${new Date().toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}
`
  }

  const handleSubmit = () => {
    if (isFormValid()) {
      setIsLoading(true)
      setCurrentStep(0)

      // Simulate step progression
      let stepIndex = 0
      const processSteps = () => {
        if (stepIndex < loadingSteps.length) {
          setTimeout(() => {
            setCurrentStep(stepIndex)
            stepIndex++
            processSteps()
          }, loadingSteps[stepIndex]?.duration || 2000)
        } else {
          // All steps completed - call mock API
          setTimeout(async () => {
            try {
              const formData = {
                productName,
                productCategory,
                businessType,
                selectedCity,
                selectedLanguage,
                offer,
              }
              const response = await submitCampaign(formData)
              setApiResponse(response)
              setIsLoading(false)
              setCurrentStep(0)
              setShowResults(true)
              console.log('API Response:', response)
            } catch (error) {
              console.error('API Error:', error)
              setIsLoading(false)
              setCurrentStep(0)
              // Still show results even on error
              setShowResults(true)
            }
          }, 500)
        }
      }
      processSteps()
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Headline */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Grow Your Business with
            <span className="block text-indigo-600 mt-2">Hyperlocal Advertising</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mt-6">
            Reach customers in your neighborhood and boost sales with targeted local ads
          </p>
        </div>

        {/* 3-Step Visual Flow */}
        <div className="max-w-4xl mx-auto mb-12 md:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-indigo-100 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-2xl md:text-3xl font-bold text-white">1</span>
                  </div>
                </div>
                <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-indigo-200 transform -translate-y-1/2"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                Set Your Location
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Choose your business area and define your target neighborhood radius
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-indigo-100 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-2xl md:text-3xl font-bold text-white">2</span>
                  </div>
                </div>
                <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-indigo-200 transform -translate-y-1/2"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                Create Your Ad
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Design compelling ads with images, offers, and messages that resonate locally
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-indigo-100 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-2xl md:text-3xl font-bold text-white">3</span>
                  </div>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                Reach Customers
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Your ads appear to nearby customers, driving foot traffic and online sales
              </p>
            </div>
          </div>
        </div>

        {/* Product Details Form */}
        <div className="max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-6 md:p-8 border border-indigo-50">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
              Tell us about your product
            </h2>
            <p className="text-gray-600 mb-6">
              We’ll use this to tailor hyperlocal campaigns for your MSME.
            </p>

            <div className="space-y-6">
              {/* Product name input */}
              <div>
                <label
                  htmlFor="product-name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Product name
                </label>
                <input
                  id="product-name"
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. Premium South Indian Filter Coffee Pack"
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm md:text-base text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                />
              </div>

              {/* City searchable dropdown */}
              <div className="relative" ref={cityDropdownRef}>
                <label
                  htmlFor="city-search"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  City
                </label>
                <div className="relative">
                  <input
                    id="city-search"
                    type="text"
                    value={citySearchQuery || selectedCity}
                    onChange={(e) => {
                      setCitySearchQuery(e.target.value)
                      setIsCityDropdownOpen(true)
                      if (selectedCity && e.target.value !== selectedCity) {
                        setSelectedCity('')
                        setSelectedLanguage('')
                      }
                    }}
                    onFocus={() => setIsCityDropdownOpen(true)}
                    placeholder="Search for your city..."
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 pr-10 text-sm md:text-base text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                  />
                  <svg
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                {/* Language display */}
                {selectedLanguage && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs text-gray-500">Language:</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {selectedLanguage}
                    </span>
                  </div>
                )}

                {/* Dropdown list */}
                {isCityDropdownOpen && filteredCities.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredCities.map((city) => {
                      const cityLanguage = getLanguageForCity(city)
                      return (
                        <button
                          key={city}
                          type="button"
                          onClick={() => handleCitySelect(city)}
                          className="w-full text-left px-4 py-3 hover:bg-indigo-50 transition-colors border-b border-gray-100 last:border-b-0"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm md:text-base text-gray-900 font-medium">
                              {city}
                            </span>
                            <span className="text-xs text-gray-500">
                              {cityLanguage}
                            </span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}

                {/* No results message */}
                {isCityDropdownOpen &&
                  citySearchQuery &&
                  filteredCities.length === 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                      <p className="text-sm text-gray-500 text-center">
                        No cities found matching "{citySearchQuery}"
                      </p>
                    </div>
                  )}
              </div>

              {/* Product category dropdown */}
              <div>
                <label
                  htmlFor="product-category"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Product category
                </label>
                <select
                  id="product-category"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm md:text-base text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                >
                  <option value="">Select a category</option>
                  <option value="food-beverage">Food &amp; Beverages</option>
                  <option value="fashion">Fashion &amp; Accessories</option>
                  <option value="services">Local Services</option>
                  <option value="health-beauty">Health &amp; Beauty</option>
                  <option value="electronics">Electronics &amp; Gadgets</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Offer input */}
              <div>
                <label
                  htmlFor="offer"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Special offer
                </label>
                <input
                  id="offer"
                  type="text"
                  value={offer}
                  onChange={(e) => setOffer(e.target.value)}
                  placeholder="e.g. 20% off on all items, Buy 2 Get 1 Free, Flat ₹500 off above ₹2000, Festival Special: 30% discount, Free delivery within 5km"
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm md:text-base text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                  maxLength={150}
                />
                <p className="mt-1 text-xs text-gray-500">
                  {offer.length}/150 characters
                </p>
              </div>

              {/* Business type card selector */}
              <div>
                <p className="block text-sm font-medium text-gray-700 mb-3">
                  Business type
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'retail',
                      label: 'Retail store',
                      description: 'Physical shop attracting walk-in customers.',
                    },
                    {
                      id: 'online',
                      label: 'Online only',
                      description: 'Sell via website, app, or marketplaces.',
                    },
                    {
                      id: 'hybrid',
                      label: 'Online + store',
                      description: 'Combine online orders with in-store sales.',
                    },
                  ].map((type) => {
                    const isActive = businessType === type.id
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setBusinessType(type.id)}
                        className={[
                          'text-left rounded-xl border px-4 py-4 text-sm md:text-base transition shadow-sm',
                          'focus:outline-none focus:ring-2 focus:ring-indigo-200',
                          isActive
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
                            : 'border-gray-200 bg-white text-gray-900 hover:border-indigo-200 hover:bg-indigo-50/60',
                        ].join(' ')}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold">{type.label}</span>
                          <span
                            className={[
                              'inline-flex h-5 w-5 items-center justify-center rounded-full border text-xs font-medium',
                              isActive
                                ? 'border-indigo-500 bg-indigo-600 text-white'
                                : 'border-gray-300 bg-white text-gray-400',
                            ].join(' ')}
                            aria-hidden="true"
                          >
                            {isActive ? '✓' : ''}
                          </span>
                        </div>
                        <p className="text-xs md:text-sm text-gray-600">
                          {type.description}
                        </p>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Animation */}
        {isLoading && (
          <div className="max-w-2xl mx-auto mb-12 md:mb-16">
            <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-8 md:p-12 border border-indigo-100">
              <div className="space-y-8">
                {/* Progress Steps */}
                <div className="space-y-6">
                  {loadingSteps.map((step, index) => {
                    const isActive = index === currentStep
                    const isCompleted = index < currentStep
                    return (
                      <div
                        key={index}
                        className={`flex items-start gap-4 transition-all duration-500 ${
                          isActive ? 'opacity-100' : 'opacity-50'
                        }`}
                      >
                        {/* Step Indicator */}
                        <div className="shrink-0 mt-1">
                          <div
                            className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                              isCompleted
                                ? 'bg-indigo-600 border-indigo-600'
                                : isActive
                                  ? 'bg-indigo-100 border-indigo-600 animate-pulse'
                                  : 'bg-white border-gray-300'
                            }`}
                          >
                            {isCompleted ? (
                              <svg
                                className="w-6 h-6 md:w-7 md:h-7 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            ) : (
                              <span
                                className={`text-sm md:text-base font-semibold ${
                                  isActive
                                    ? 'text-indigo-600'
                                    : 'text-gray-400'
                                }`}
                              >
                                {index + 1}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Step Text */}
                        <div className="flex-1 pt-2">
                          <p
                            className={`text-base md:text-lg font-medium transition-all duration-500 ${
                              isActive
                                ? 'text-gray-900'
                                : isCompleted
                                  ? 'text-gray-700'
                                  : 'text-gray-400'
                            }`}
                          >
                            {step.text}
                          </p>
                        </div>

                        {/* Animated Dot */}
                        {isActive && (
                          <div className="shrink-0 pt-2">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
                              <div
                                className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"
                                style={{ animationDelay: '0.1s' }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"
                                style={{ animationDelay: '0.2s' }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Progress Bar */}
                <div className="pt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${
                          ((currentStep + 1) / loadingSteps.length) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Step {currentStep + 1} of {loadingSteps.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {showResults && (
          <div className="max-w-3xl mx-auto mb-12 md:mb-16 animate-fade-in">
            <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-6 md:p-8 border border-indigo-100">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Campaign Summary
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(generateFormSummary(), 'Summary')}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    {copiedText === 'Summary' ? (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        Copy Summary
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setShowResults(false)}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {/* Form Summary */}
                <div className="space-y-3 text-gray-700 whitespace-pre-line font-mono text-sm bg-gray-50 p-4 rounded-lg border border-gray-200">
                  {generateFormSummary()}
                </div>

                {/* API Response Data */}
                {apiResponse && (
                  <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <h4 className="font-semibold text-indigo-900 mb-3 flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
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
                      Campaign Created Successfully
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-700">
                        <span className="font-medium">Campaign ID:</span>{' '}
                        {apiResponse.data.campaign.id}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Status:</span>{' '}
                        <span className="text-green-600 font-semibold capitalize">
                          {apiResponse.data.campaign.status}
                        </span>
                      </p>
                      {apiResponse.data.adContent && (
                        <div className="mt-3 pt-3 border-t border-indigo-200">
                          <p className="font-medium text-indigo-900 mb-2">
                            Generated Ad Content:
                          </p>
                          <p className="text-gray-700 mb-1">
                            <span className="font-medium">Headline:</span>{' '}
                            {apiResponse.data.adContent.headline}
                          </p>
                          <p className="text-gray-700">
                            <span className="font-medium">Description:</span>{' '}
                            {apiResponse.data.adContent.description}
                          </p>
                        </div>
                      )}
                      {apiResponse.data.analytics && (
                        <div className="mt-3 pt-3 border-t border-indigo-200">
                          <p className="font-medium text-indigo-900 mb-2">
                            Estimated Performance:
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-gray-600">Reach:</span>{' '}
                              <span className="font-semibold">
                                {apiResponse.data.analytics.estimatedReach.toLocaleString()}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600">Impressions:</span>{' '}
                              <span className="font-semibold">
                                {apiResponse.data.analytics.estimatedImpressions.toLocaleString()}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600">Clicks:</span>{' '}
                              <span className="font-semibold">
                                {apiResponse.data.analytics.estimatedClicks.toLocaleString()}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600">Conversions:</span>{' '}
                              <span className="font-semibold">
                                {apiResponse.data.analytics.estimatedConversions.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(JSON.stringify(apiResponse, null, 2), 'API Response')
                      }
                      className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      {copiedText === 'API Response' ? (
                        <>
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          API Response Copied!
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                          Copy API Response (JSON)
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Copy Success Toast */}
        {copiedText && (
          <div className="fixed bottom-4 right-4 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-fade-in">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="font-medium">{copiedText} copied to clipboard!</span>
          </div>
        )}

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={!isFormValid() || isLoading}
            className={`font-semibold py-4 px-8 md:py-5 md:px-12 rounded-lg text-lg md:text-xl shadow-lg transition-all duration-300 ${
              isFormValid() && !isLoading
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-xl transform hover:scale-105 cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isLoading ? 'Processing...' : 'Get Started Free'}
          </button>
        </div>

        {/* Tab-based UI */}
        <div className="max-w-4xl mx-auto mt-16 md:mt-20">
          <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl border border-indigo-50 overflow-hidden">
            {/* Tab Headers */}
            <div className="border-b border-gray-200">
              <div className="flex flex-wrap">
                {[
                  { id: 0, label: 'Overview' },
                  { id: 1, label: 'Features' },
                  { id: 2, label: 'Pricing' },
                  { id: 3, label: 'Support' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 min-w-[120px] px-4 md:px-6 py-4 text-sm md:text-base font-medium transition-all duration-300 border-b-2 ${
                      activeTab === tab.id
                        ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6 md:p-8">
              {activeTab === 0 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                      Hyperlocal Advertising Platform
                    </h3>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          'Reach customers in your neighborhood with targeted local ads designed specifically for MSMEs. Our platform helps small businesses connect with nearby customers and boost sales.',
                          'Description'
                        )
                      }
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0"
                      title="Copy description"
                    >
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                    Reach customers in your neighborhood with targeted local ads
                    designed specifically for MSMEs. Our platform helps small
                    businesses connect with nearby customers and boost sales.
                    {copiedText === 'Description' && (
                      <span className="ml-2 text-sm text-indigo-600 font-medium">
                        Copied!
                      </span>
                    )}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 mt-1">
                        <svg
                          className="w-4 h-4 text-indigo-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          Local Targeting
                        </h4>
                        <p className="text-sm text-gray-600">
                          Target customers within your business radius
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 mt-1">
                        <svg
                          className="w-4 h-4 text-indigo-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          Easy Setup
                        </h4>
                        <p className="text-sm text-gray-600">
                          Get started in minutes with simple form
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Powerful Features
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: 'Multi-language Support',
                        description:
                          'Automatically detect and use the local language based on your city selection.',
                      },
                      {
                        title: 'Smart Category Matching',
                        description:
                          'Choose from various product categories optimized for local markets.',
                      },
                      {
                        title: 'Offer Management',
                        description:
                          'Create compelling offers and promotions that attract local customers.',
                      },
                      {
                        title: 'Business Type Optimization',
                        description:
                          'Tailored ad strategies for retail stores, online businesses, or hybrid models.',
                      },
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg bg-gray-50 border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors"
                      >
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Simple Pricing
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    {[
                      {
                        name: 'Starter',
                        price: '₹999',
                        period: '/month',
                        features: [
                          'Up to 100 ads',
                          'Local targeting',
                          'Basic analytics',
                        ],
                      },
                      {
                        name: 'Professional',
                        price: '₹2,499',
                        period: '/month',
                        features: [
                          'Unlimited ads',
                          'Advanced targeting',
                          'Detailed analytics',
                          'Priority support',
                        ],
                        popular: true,
                      },
                      {
                        name: 'Enterprise',
                        price: 'Custom',
                        period: '',
                        features: [
                          'Custom solutions',
                          'Dedicated manager',
                          'API access',
                          '24/7 support',
                        ],
                      },
                    ].map((plan, index) => (
                      <div
                        key={index}
                        className={`p-6 rounded-xl border-2 transition-all ${
                          plan.popular
                            ? 'border-indigo-600 bg-indigo-50 shadow-lg scale-105'
                            : 'border-gray-200 bg-white hover:border-indigo-200'
                        }`}
                      >
                        {plan.popular && (
                          <span className="inline-block px-2 py-1 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded mb-3">
                            Popular
                          </span>
                        )}
                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                          {plan.name}
                        </h4>
                        <div className="mb-4">
                          <span className="text-3xl font-bold text-gray-900">
                            {plan.price}
                          </span>
                          <span className="text-gray-600">{plan.period}</span>
                        </div>
                        <ul className="space-y-2">
                          {plan.features.map((feature, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm text-gray-600"
                            >
                              <svg
                                className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Get Support
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="p-6 rounded-lg bg-gray-50 border border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-indigo-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <h4 className="font-semibold text-gray-900">
                            Email Support
                          </h4>
                        </div>
                        <button
                          onClick={() =>
                            copyToClipboard('support@hyperlocalads.com', 'Email')
                          }
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                          title="Copy email"
                        >
                          <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                        <span>support@hyperlocalads.com</span>
                        {copiedText === 'Email' && (
                          <span className="text-xs text-indigo-600 font-medium">
                            Copied!
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500">
                        Response within 24 hours
                      </p>
                    </div>

                    <div className="p-6 rounded-lg bg-gray-50 border border-gray-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-indigo-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-gray-900">
                          Live Chat
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Available 9 AM - 6 PM IST
                      </p>
                      <p className="text-xs text-gray-500">
                        Monday to Saturday
                      </p>
                    </div>

                    <div className="p-6 rounded-lg bg-gray-50 border border-gray-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-indigo-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-gray-900">
                          Documentation
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Comprehensive guides and tutorials
                      </p>
                      <p className="text-xs text-gray-500">
                        Learn how to maximize your results
                      </p>
                    </div>

                    <div className="p-6 rounded-lg bg-gray-50 border border-gray-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-indigo-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                            />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-gray-900">
                          Community Forum
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Connect with other MSMEs
                      </p>
                      <p className="text-xs text-gray-500">
                        Share tips and best practices
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
