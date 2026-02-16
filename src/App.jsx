import './App.css'
import { useState } from 'react'
import { useLanguage } from './i18n'

// Landing Components
import HeroSection from './components/Landing/HeroSection'
import FeatureStrip from './components/Landing/FeatureStrip'

// Common Components
import SectionContainer from './components/Common/SectionContainer'
import CopyButton from './components/Common/CopyButton'

function App() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">

      {/* Hero Section */}
      <HeroSection
        headline={t('hero.headline')}
        subheadline={t('hero.subheadline')}
        ctaText={t('hero.cta')}
        onCtaClick={() => {
          document.getElementById('tabs-section')?.scrollIntoView({ behavior: 'smooth' })
        }}
      />

      {/* Feature Strip */}
      <FeatureStrip />

      {/* Tab-based UI */}
      <div id="tabs-section" className="max-w-4xl mx-auto mt-16 md:mt-20">
        <SectionContainer className="overflow-hidden">

          {/* Tab Headers */}
          <div className="border-b border-gray-200">
            <div className="flex flex-wrap">
              {[
                { id: 0, label: t('tabs.overview') },
                { id: 1, label: t('tabs.features') },
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
                      <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
                      <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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

          </div>
        </SectionContainer>
      </div>
            <footer style={{
          marginTop: "60px",
          padding: "20px 0",
          textAlign: "center",
          borderTop: "1px solid #e5e7eb",
          color: "#6b7280",
          fontSize: "14px"
        }}
      >
        © {new Date().getFullYear()} HyperLocal AI. All rights reserved.
      </footer>
    </div>
  )
}

export default App