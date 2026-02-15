import './App.css'
import { useState, useEffect } from 'react'
import { submitCampaign, regenerateCampaign } from './services/api'
import { useLanguage } from './i18n'

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
  const { t } = useLanguage()
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
  // Feedback & regeneration state machine: idle | generated | feedback | regenerating | finalized
  const [feedbackState, setFeedbackState] = useState('idle')
  const [feedbackText, setFeedbackText] = useState('')
  const [isRecording, setIsRecording] = useState(false)

  const loadingSteps = [
    { textKey: 'loader.step1', duration: 2000 },
    { textKey: 'loader.step2', duration: 2000 },
    { textKey: 'loader.step3', duration: 2500 },
    { textKey: 'loader.step4', duration: 1500 },
  ]

  // When results are shown with content, show feedback section (generated state)
  useEffect(() => {
    if (showResults && apiResponse?.data?.adContent) {
      setFeedbackState('generated')
    }
  }, [showResults, apiResponse])

  // Validate required fields
  const isFormValid = () => {
  return (
    typeof productName === 'string' &&
    productName.trim().length > 0 &&

    typeof selectedCity === 'string' &&
    selectedCity.trim().length > 0 &&

    typeof productCategory === 'string' &&
    productCategory.trim().length > 0
  )
}

  console.table({
    productName,
    selectedCity,
    productCategory,
    isLoading,
    isFormValid: isFormValid()
  })
  // Generate formatted form summary
  const generateFormSummary = () => {
    const categoryLabels = {
      'food-beverage': t('form.categoryFood'),
      fashion: t('form.categoryFashion'),
      services: t('form.categoryServices'),
      'health-beauty': t('form.categoryHealth'),
      electronics: t('form.categoryElectronics'),
      other: t('form.categoryOther'),
    }

    const businessTypeLabels = {
      retail: t('form.businessRetail'),
      online: t('form.businessOnline'),
      hybrid: t('form.businessHybrid'),
    }

    return `Hyperlocal Ad Campaign Details

Product Name: ${productName}
Category: ${categoryLabels[productCategory] || productCategory}
Business Type: ${businessTypeLabels[businessType] || businessType}
City: ${selectedCity}
Language: ${selectedLanguage}
${offer ? `${t('form.specialOffer')}: ${offer}` : ''}

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

  // Serialize current output for regeneration prompt (preserve context)
  const serializeOutputForPrompt = (data) => {
    if (!data) return ''
    const lines = [
      '[Poster]',
      `Headline: ${data.poster?.headline || ''}`,
      `Description: ${data.poster?.description || ''}`,
      data.poster?.offer ? `Offer: ${data.poster.offer}` : '',
      '[Instagram]',
      data.instagram?.caption || '',
      data.instagram?.hashtags?.length ? `Hashtags: ${data.instagram.hashtags.join(', ')}` : '',
      '[WhatsApp]',
      data.whatsapp?.message || '',
      '[Voice Script]',
      data.voice?.script || '',
    ]
    return lines.filter(Boolean).join('\n')
  }

  const handleLooksGood = () => {
    setFeedbackState('finalized')
  }

  const handleImproveClick = () => {
    setFeedbackState('feedback')
    setFeedbackText('')
  }

  const handleFeedbackCancel = () => {
    setFeedbackState('generated')
    setFeedbackText('')
  }

  const handleVoiceFeedback = () => {
    if (isRecording) {
      setIsRecording(false)
      setFeedbackText((prev) => prev + (prev ? ' ' : '') + '[Mock transcription: Make the tone more friendly and keep it short.]')
    } else {
      setIsRecording(true)
    }
  }

  const handleRegenerate = async () => {
    if (!apiResponse?.data?.campaign?.id || !outputData) return
    setFeedbackState('regenerating')
    const previousOutputText = serializeOutputForPrompt(outputData)
    try {
      const result = await regenerateCampaign({
        campaignId: apiResponse.data.campaign.id,
        previousOutputText,
        userFeedback: feedbackText.trim() || 'Improve the copy while keeping the same message.',
        context: {
          productName,
          selectedCity,
          selectedLanguage,
          productCategory,
          selectedPlatforms,
          offer,
          businessType,
        },
        existingResponse: apiResponse,
      })
      setApiResponse(result)
      setFeedbackText('')
      setFeedbackState('generated')
    } catch (err) {
      console.error('Regeneration failed:', err)
      setFeedbackState('feedback')
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <HeroSection
        headline={t('hero.headline')}
        subheadline={t('hero.subheadline')}
        ctaText={t('hero.cta')}
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
              {t('form.tellUs')}
            </h2>
            <p className="text-gray-600 mb-6">
              {t('form.tellUsDesc')}
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
            steps={loadingSteps.map((s) => ({ text: t(s.textKey), duration: s.duration }))}
          />
        )}

        {/* Results Section */}
        {showResults && outputData && (
          <div className="max-w-4xl mx-auto mb-12 md:mb-16 animate-fade-in">
            <SectionContainer className="overflow-hidden">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {t('results.yourCampaign')}
                </h3>
                <div className="flex items-center gap-2">
                  <CopyButton
                    text={generateFormSummary()}
                    label={t('results.summary')}
                    variant="primary"
                  />
                  <button
                    onClick={() => {
                      setShowResults(false)
                      setFeedbackState('idle')
                      setFeedbackText('')
                    }}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    {t('results.close')}
                  </button>
                </div>
              </div>

              {/* Output Tabs */}
              <OutputTabs
                activeTab={outputTab}
                onTabChange={setOutputTab}
                tabs={[
                  { id: 0, label: t('results.poster') },
                  { id: 1, label: t('results.instagram') },
                  { id: 2, label: t('results.whatsapp') },
                  { id: 3, label: t('results.voice') },
                ]}
              />

              {/* Output Content */}
              <div>
                {outputTab === 0 && <PosterOutput data={outputData.poster} />}
                {outputTab === 1 && <InstagramOutput data={outputData.instagram} />}
                {outputTab === 2 && <WhatsAppOutput data={outputData.whatsapp} />}
                {outputTab === 3 && <VoiceAdOutput data={outputData.voice} />}
              </div>

              {/* Feedback: Is this good? + Improve / Regenerate */}
              {(feedbackState === 'generated' || feedbackState === 'feedback' || feedbackState === 'regenerating') && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  {feedbackState === 'regenerating' && (
                    <p className="text-indigo-600 font-medium mb-4 flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {t('results.feedbackRegenerating')}
                    </p>
                  )}
                  {feedbackState === 'generated' && (
                    <>
                      <p className="text-gray-700 font-medium mb-3">{t('results.feedbackQuestion')}</p>
                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={handleLooksGood}
                          className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                        >
                          <span aria-hidden></span>
                          {t('results.feedbackLooksGood')}
                        </button>
                        <button
                          type="button"
                          onClick={handleImproveClick}
                          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
                        >
                          <span aria-hidden></span>
                          {t('results.feedbackImprove')}
                        </button>
                      </div>
                    </>
                  )}
                  {feedbackState === 'feedback' && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <label className="block">
                        <span className="sr-only">{t('results.feedbackPlaceholder')}</span>
                        <textarea
                          value={feedbackText}
                          onChange={(e) => setFeedbackText(e.target.value)}
                          placeholder={t('results.feedbackPlaceholder')}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
                        />
                      </label>
                      <div className="flex flex-wrap gap-3 items-center">
                        <button
                          type="button"
                          onClick={handleVoiceFeedback}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${isRecording ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
                        >
                          {isRecording ? (
                            <>
                              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                              Recording… Click to stop
                            </>
                          ) : (
                            <>🎤 {t('results.feedbackVoice')}</>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={handleRegenerate}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                        >
                          🔁 {t('results.feedbackRegenerate')}
                        </button>
                        <button
                          type="button"
                          onClick={handleFeedbackCancel}
                          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
                        >
                          {t('results.feedbackCancel')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

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
                    {t('results.campaignCreated')}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700">
                      <span className="font-medium">{t('results.campaignId')}:</span>{' '}
                      {apiResponse.data.campaign.id}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">{t('results.status')}:</span>{' '}
                      <span className="text-green-600 font-semibold capitalize">
                        {apiResponse.data.campaign.status}
                      </span>
                    </p>
                    {apiResponse.data.analytics && (
                      <div className="mt-3 pt-3 border-t border-indigo-200">
                        <p className="font-medium text-indigo-900 mb-2">
                          {t('results.estimatedPerformance')}:
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-gray-600">{t('results.reach')}:</span>{' '}
                            <span className="font-semibold">
                              {apiResponse.data.analytics.estimatedReach.toLocaleString()}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">{t('results.impressions')}:</span>{' '}
                            <span className="font-semibold">
                              {apiResponse.data.analytics.estimatedImpressions.toLocaleString()}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">{t('results.clicks')}:</span>{' '}
                            <span className="font-semibold">
                              {apiResponse.data.analytics.estimatedClicks.toLocaleString()}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">{t('results.conversions')}:</span>{' '}
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
                    label={t('results.apiResponse')}
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
            {isLoading ? t('cta.processing') : t('cta.getStarted')}
          </PrimaryButton>
        </div>

        {/* Tab-based UI */}
        <div className="max-w-4xl mx-auto mt-16 md:mt-20">
          <SectionContainer className="overflow-hidden">
            {/* Tab Headers */}
            <div className="border-b border-gray-200">
              <div className="flex flex-wrap">
                {[
                  { id: 0, label: t('tabs.overview') },
                  { id: 1, label: t('tabs.features') },
                  { id: 2, label: t('tabs.pricing') },
                  { id: 3, label: t('tabs.support') },
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
                      {t('overview.title')}
                    </h3>
                    <CopyButton
                      text={t('overview.description')}
                      label={t('results.summary')}
                      variant="icon"
                    />
                  </div>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                    {t('overview.description')}
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
                          {t('overview.localTargeting')}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {t('overview.localTargetingDesc')}
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
                          {t('overview.easySetup')}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {t('overview.easySetupDesc')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {t('platformFeatures.title')}
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        titleKey: 'platformFeatures.multiLanguage',
                        descKey: 'platformFeatures.multiLanguageDesc',
                      },
                      {
                        titleKey: 'platformFeatures.smartCategory',
                        descKey: 'platformFeatures.smartCategoryDesc',
                      },
                      {
                        titleKey: 'platformFeatures.offerManagement',
                        descKey: 'platformFeatures.offerManagementDesc',
                      },
                      {
                        titleKey: 'platformFeatures.businessOptimization',
                        descKey: 'platformFeatures.businessOptimizationDesc',
                      },
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg bg-gray-50 border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors"
                      >
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {t(feature.titleKey)}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {t(feature.descKey)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {t('pricing.title')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    {[
                      {
                        nameKey: 'pricing.starter',
                        price: '₹999',
                        periodKey: 'pricing.perMonth',
                        featureKeys: ['pricing.upTo100Ads', 'pricing.localTargeting', 'pricing.basicAnalytics'],
                      },
                      {
                        nameKey: 'pricing.professional',
                        price: '₹2,499',
                        periodKey: 'pricing.perMonth',
                        featureKeys: ['pricing.unlimitedAds', 'pricing.advancedTargeting', 'pricing.detailedAnalytics', 'pricing.prioritySupport'],
                        popular: true,
                      },
                      {
                        nameKey: 'pricing.enterprise',
                        price: t('pricing.custom'),
                        periodKey: null,
                        featureKeys: ['pricing.customSolutions', 'pricing.dedicatedManager', 'pricing.apiAccess', 'pricing.support24x7'],
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
                            {t('pricing.popular')}
                          </span>
                        )}
                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                          {t(plan.nameKey)}
                        </h4>
                        <div className="mb-4">
                          <span className="text-3xl font-bold text-gray-900">
                            {plan.price}
                          </span>
                          <span className="text-gray-600">{plan.periodKey ? t(plan.periodKey) : ''}</span>
                        </div>
                        <ul className="space-y-2">
                          {plan.featureKeys.map((key, idx) => (
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
                              {t(key)}
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
                    {t('support.title')}
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
                            {t('support.emailSupport')}
                          </h4>
                        </div>
                        <CopyButton
                          text={t('support.emailValue')}
                          label={t('support.emailSupport')}
                          variant="icon"
                        />
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {t('support.emailValue')}
                      </p>
                      <p className="text-xs text-gray-500">
                        {t('support.responseTime')}
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
                          {t('support.liveChat')}
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {t('support.liveChatHours')}
                      </p>
                      <p className="text-xs text-gray-500">
                        {t('support.liveChatDays')}
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
                          {t('support.documentation')}
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {t('support.documentationDesc')}
                      </p>
                      <p className="text-xs text-gray-500">
                        {t('support.documentationSub')}
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
                          {t('support.communityForum')}
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {t('support.communityForumDesc')}
                      </p>
                      <p className="text-xs text-gray-500">
                        {t('support.communityForumSub')}
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
