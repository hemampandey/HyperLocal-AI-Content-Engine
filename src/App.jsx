import './App.css'
import { useState, useEffect } from 'react'
import { submitCampaign } from './services/api'

// Landing Components
import HeroSection from './components/Landing/HeroSection'
import FeatureStrip from './components/Landing/FeatureStrip'

// Form Components
import ProductInput from './components/Form/ProductInput'
import CategorySelect from './components/Form/CategorySelect'
import BusinessTypeCards from './components/Form/BusinessTypeCards'
import CitySelector from './components/Form/CitySelector'
import LanguageSelector from './components/Form/LanguageSelector'
import OfferInput from './components/Form/OfferInput'
import PlatformSelector from './components/Form/PlatformSelector'

// Loader Component
import GenerationLoader from './components/Loader/GenerationLoader'

// Output Components
import OutputTabs from './components/Output/OutputTabs'
import PosterOutput from './components/Output/PosterOutput'
import InstagramOutput from './components/Output/InstagramOutput'
import WhatsAppOutput from './components/Output/WhatsAppOutput'
import VoiceAdOutput from './components/Output/VoiceAdOutput'

// Common Components
import PrimaryButton from './components/Common/PrimaryButton'
import SectionContainer from './components/Common/SectionContainer'
import CopyButton from './components/Common/CopyButton'

function App() {
  const [productName, setProductName] = useState('')
  const [productCategory, setProductCategory] = useState('')
  const [businessType, setBusinessType] = useState('retail')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [offer, setOffer] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [activeTab, setActiveTab] = useState(0)
  const [outputTab, setOutputTab] = useState(0) // For output tabs (Poster, Instagram, etc.)
  const [showResults, setShowResults] = useState(false)
  const [apiResponse, setApiResponse] = useState(null)

  const loadingSteps = [
    { text: 'Product samajh rahe hain', duration: 2000 },
    { text: 'Sheher ke trends dekh rahe hain', duration: 2000 },
    { text: 'Local bhasha mein likh rahe hain', duration: 2500 },
    { text: 'Ad tayar kar rahe hain', duration: 1500 },
  ]

  // Validate required fields
  const isFormValid = () => {
    return (
      productName.trim() !== '' &&
      selectedCity !== '' &&
      productCategory !== ''
    )
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

  // Prepare output data from API response
  const getOutputData = () => {
    if (!apiResponse?.data?.adContent) return null

    const adContent = apiResponse.data.adContent
    const product = apiResponse.data.product
    const business = apiResponse.data.business

    return {
      poster: {
        headline: adContent.headline,
        description: adContent.description,
        offer: offer || adContent.callToAction,
      },
      instagram: {
        caption: `${adContent.headline}\n\n${adContent.description}${offer ? `\n\n${offer}` : ''}`,
        hashtags: [
          product.name.toLowerCase().replace(/\s+/g, ''),
          selectedCity.toLowerCase(),
          productCategory,
          'hyperlocal',
          'localbusiness',
          'shoplocal',
        ],
      },
      whatsapp: {
        message: `*${adContent.headline}*\n\n${adContent.description}${offer ? `\n\n🎉 ${offer}` : ''}\n\n📍 ${selectedCity}`,
        businessName: product.name,
      },
      voice: {
        script: `${adContent.headline}. ${adContent.description}${offer ? ` Special offer: ${offer}` : ''}. Visit us in ${selectedCity}.`,
        duration: Math.ceil(
          (`${adContent.headline}. ${adContent.description}${offer ? ` Special offer: ${offer}` : ''}. Visit us in ${selectedCity}.`.length / 10)
        ),
        language: selectedLanguage,
      },
    }
  }

  const outputData = getOutputData()

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <HeroSection
        headline="Apni Dukaan Ko Digital Banao"
        subheadline="Local customers ko reach karein, sales badhayen"
        ctaText="Shuru Karein"
        onCtaClick={() => {
          document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })
        }}
      />

      {/* Feature Strip */}
      <FeatureStrip />

      {/* Product Details Form */}
      <div id="form-section" className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto mb-12 md:mb-16">
          <SectionContainer>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
              Tell us about your product
            </h2>
            <p className="text-gray-600 mb-6">
              We'll use this to tailor hyperlocal campaigns for your MSME.
            </p>

            <div className="space-y-6">
              {/* Product name input */}
              <ProductInput
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />

              {/* City selector */}
              <CitySelector
                value={selectedCity}
                onChange={setSelectedCity}
                onLanguageChange={setSelectedLanguage}
              />

              {/* Language selector */}
              {selectedCity && (
                <LanguageSelector
                  value={selectedLanguage}
                  onChange={setSelectedLanguage}
                  autoDetectedLanguage={selectedLanguage}
                />
              )}

              {/* Product category dropdown */}
              <CategorySelect
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
              />

              {/* Offer input */}
              <OfferInput
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
              />

              {/* Business type card selector */}
              <BusinessTypeCards
                value={businessType}
                onChange={setBusinessType}
              />

              {/* Platform selector */}
              <PlatformSelector
                selectedPlatforms={selectedPlatforms}
                onChange={setSelectedPlatforms}
              />
            </div>
          </SectionContainer>
        </div>

        {/* Loading Animation */}
        {isLoading && (
          <GenerationLoader
            currentStep={currentStep}
            steps={loadingSteps}
          />
        )}

        {/* Results Section */}
        {showResults && outputData && (
          <div className="max-w-4xl mx-auto mb-12 md:mb-16 animate-fade-in">
            <SectionContainer className="overflow-hidden">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Your Ad Campaign
                </h3>
                <div className="flex items-center gap-2">
                  <CopyButton
                    text={generateFormSummary()}
                    label="Summary"
                    variant="primary"
                  />
                  <button
                    onClick={() => setShowResults(false)}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>

              {/* Output Tabs */}
              <OutputTabs
                activeTab={outputTab}
                onTabChange={setOutputTab}
                tabs={[
                  { id: 0, label: 'Poster' },
                  { id: 1, label: 'Instagram' },
                  { id: 2, label: 'WhatsApp' },
                  { id: 3, label: 'Voice' },
                ]}
              />

              {/* Output Content */}
              <div>
                {outputTab === 0 && <PosterOutput data={outputData.poster} />}
                {outputTab === 1 && <InstagramOutput data={outputData.instagram} />}
                {outputTab === 2 && <WhatsAppOutput data={outputData.whatsapp} />}
                {outputTab === 3 && <VoiceAdOutput data={outputData.voice} />}
              </div>

              {/* API Response Summary */}
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
                  <CopyButton
                    text={JSON.stringify(apiResponse, null, 2)}
                    label="API Response"
                    variant="primary"
                    className="mt-4 w-full justify-center"
                  />
                </div>
              )}
            </SectionContainer>
          </div>
        )}

        {/* CTA Button */}
        <div className="text-center">
          <PrimaryButton
            onClick={handleSubmit}
            disabled={!isFormValid() || isLoading}
          >
            {isLoading ? 'Processing...' : 'Get Started Free'}
          </PrimaryButton>
        </div>

        {/* Tab-based UI */}
        <div className="max-w-4xl mx-auto mt-16 md:mt-20">
          <SectionContainer className="overflow-hidden">
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
                    <CopyButton
                      text="Reach customers in your neighborhood with targeted local ads designed specifically for MSMEs. Our platform helps small businesses connect with nearby customers and boost sales."
                      label="Description"
                      variant="icon"
                    />
                  </div>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                    Reach customers in your neighborhood with targeted local ads
                    designed specifically for MSMEs. Our platform helps small
                    businesses connect with nearby customers and boost sales.
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
                        <CopyButton
                          text="support@hyperlocalads.com"
                          label="Email"
                          variant="icon"
                        />
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        support@hyperlocalads.com
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
          </SectionContainer>
        </div>
      </div>
    </div>
  )
}

export default App
