import { useState } from 'react'
import SectionContainer from '../components/Common/SectionContainer'
import PrimaryButton from '../components/Common/PrimaryButton'
import { useLanguage } from '../i18n'

function Pricing() {
  const { t } = useLanguage()
  const [selectedPlan, setSelectedPlan] = useState(null)

  const plans = [
    {
      nameKey: 'pricing.starter',
      price: '₹999',
      periodKey: 'pricing.perMonth',
      featureKeys: [
        'pricing.upTo100Ads',
        'pricing.localTargeting',
        'pricing.basicAnalytics',
      ],
    },
    {
      nameKey: 'pricing.professional',
      price: '₹2,499',
      periodKey: 'pricing.perMonth',
      featureKeys: [
        'pricing.unlimitedAds',
        'pricing.advancedTargeting',
        'pricing.detailedAnalytics',
        'pricing.prioritySupport',
      ],
      popular: true,
    },
    {
      nameKey: 'pricing.enterprise',
      price: t('pricing.custom'),
      periodKey: null,
      featureKeys: [
        'pricing.customSolutions',
        'pricing.dedicatedManager',
        'pricing.apiAccess',
        'pricing.support24x7',
      ],
    },
  ]

  const handlePlanSelect = (planName) => {
    setSelectedPlan(planName)
    document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('pricing.title')}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Scale your hyperlocal campaigns with plans built for every business size.
          </p>
        </div>

        <SectionContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                onClick={() => handlePlanSelect(plan.nameKey)}
                className={`
                    p-8 rounded-2xl border-2 transition-all duration-300 transform cursor-pointer
                    hover:scale-105 hover:shadow-xl
                    ${plan.popular
                    ? 'border-gray-200 bg-indigo-50 hover:border-indigo-600 hover:bg-indigo-50/30'
                    : 'border-gray-200 bg-white hover:border-indigo-200 hover:bg-indigo-50/30'
                    }
                    ${selectedPlan === plan.nameKey ? 'border-indigo-600 shadow-xl scale-105' : ''}
                `}
                >

                {plan.popular && (
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full mb-4">
                    {t('pricing.popular')}
                  </span>
                )}

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {t(plan.nameKey)}
                </h3>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-1">
                    {plan.periodKey ? t(plan.periodKey) : ''}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.featureKeys.map((key, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
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

                <PrimaryButton
                  onClick={() => handlePlanSelect(plan.nameKey)}
                  className="w-full"
                >
                  {t('cta.getStarted')}
                </PrimaryButton>
              </div>
            ))}
          </div>
        </SectionContainer>
      </div>
    </div>
  )
}

export default Pricing
