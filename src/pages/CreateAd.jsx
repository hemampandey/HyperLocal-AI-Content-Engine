import { useState, useEffect } from 'react'
import { submitCampaign, regenerateCampaign } from '../services/api'
import { useLanguage } from '../i18n'

// Form Components
import ProductInput from '../components/Form/ProductInput'
import CategorySelect from '../components/Form/CategorySelect'
import BusinessTypeCards from '../components/Form/BusinessTypeCards'
import CitySelector from '../components/Form/CitySelector'
import LanguageSelector from '../components/Form/LanguageSelector'
import OfferInput from '../components/Form/OfferInput'
import PlatformSelector from '../components/Form/PlatformSelector'

// Loader
import GenerationLoader from '../components/Loader/GenerationLoader'

// Output
import OutputTabs from '../components/Output/OutputTabs'
import PosterOutput from '../components/Output/PosterOutput'
import InstagramOutput from '../components/Output/InstagramOutput'
import WhatsAppOutput from '../components/Output/WhatsAppOutput'
import VoiceAdOutput from '../components/Output/VoiceAdOutput'

// Common
import PrimaryButton from '../components/Common/PrimaryButton'
import SectionContainer from '../components/Common/SectionContainer'
import CopyButton from '../components/Common/CopyButton'

function CreateAd() {
  const { t } = useLanguage()

  // ---------------- STATE ----------------
  const [productName, setProductName] = useState('')
  const [productCategory, setProductCategory] = useState('')
  const [businessType, setBusinessType] = useState('retail')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [offer, setOffer] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [outputTab, setOutputTab] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [apiResponse, setApiResponse] = useState(null)
  const [feedbackState, setFeedbackState] = useState('idle')
  const [feedbackText, setFeedbackText] = useState('')
  const [isRecording, setIsRecording] = useState(false)

  const loadingSteps = [
    { textKey: 'loader.step1', duration: 2000 },
    { textKey: 'loader.step2', duration: 2000 },
    { textKey: 'loader.step3', duration: 2500 },
    { textKey: 'loader.step4', duration: 1500 },
  ]

  useEffect(() => {
    if (showResults && apiResponse?.data?.adContent) {
      setFeedbackState('generated')
    }
  }, [showResults, apiResponse])

  const isFormValid = () =>
    productName.trim() &&
    selectedCity.trim() &&
    productCategory.trim()

  // ---------------- SUBMIT ----------------
  const handleSubmit = async () => {
    if (!isFormValid()) return

    setIsLoading(true)

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
      setShowResults(true)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // ---------------- OUTPUT FORMAT ----------------
  const getOutputData = () => {
    if (!apiResponse?.data?.adContent) return null

    const ad = apiResponse.data.adContent

    return {
      poster: {
        headline: ad.headline,
        description: ad.description,
        offer: offer || ad.callToAction,
      },
      instagram: {
        caption: `${ad.headline}\n\n${ad.description}`,
        hashtags: [
          productName.toLowerCase().replace(/\s+/g, ''),
          selectedCity.toLowerCase(),
          productCategory,
        ],
      },
      whatsapp: {
        message: `*${ad.headline}*\n\n${ad.description}\n\n📍 ${selectedCity}`,
      },
      voice: {
        script: `${ad.headline}. ${ad.description}. Visit us in ${selectedCity}.`,
        language: selectedLanguage,
      },
    }
  }

  const outputData = getOutputData()

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">

        <SectionContainer>
          <h2 className="text-3xl font-bold mb-6">
            {t('form.tellUs')}
          </h2>

          <div className="space-y-6">
            <ProductInput
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />

            <CitySelector
              value={selectedCity}
              onChange={setSelectedCity}
              onLanguageChange={setSelectedLanguage}
            />

            {selectedCity && (
              <LanguageSelector
                value={selectedLanguage}
                onChange={setSelectedLanguage}
              />
            )}

            <CategorySelect
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
            />

            <OfferInput
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
            />

            <BusinessTypeCards
              value={businessType}
              onChange={setBusinessType}
            />

            <PlatformSelector
              selectedPlatforms={selectedPlatforms}
              onChange={setSelectedPlatforms}
            />
          </div>
        </SectionContainer>

        <div className="text-center mt-8">
          <PrimaryButton
            onClick={handleSubmit}
            disabled={!isFormValid() || isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Campaign'}
          </PrimaryButton>
        </div>

        {isLoading && (
          <GenerationLoader
            currentStep={currentStep}
            steps={loadingSteps.map((s) => ({
              text: t(s.textKey),
              duration: s.duration,
            }))}
          />
        )}

        {showResults && outputData && (
          <div className="mt-12">
            <SectionContainer>
              <h3 className="text-2xl font-bold mb-6">
                {t('results.yourCampaign')}
              </h3>

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

              <div className="mt-6">
                {outputTab === 0 && <PosterOutput data={outputData.poster} />}
                {outputTab === 1 && <InstagramOutput data={outputData.instagram} />}
                {outputTab === 2 && <WhatsAppOutput data={outputData.whatsapp} />}
                {outputTab === 3 && <VoiceAdOutput data={outputData.voice} />}
              </div>

              <CopyButton
                text={JSON.stringify(apiResponse, null, 2)}
                label="Copy API Response"
                variant="primary"
                className="mt-6"
              />
            </SectionContainer>
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateAd