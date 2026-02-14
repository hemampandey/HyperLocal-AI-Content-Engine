import { useLanguage } from '../../i18n'

const featureKeys = [
  { titleKey: 'features.localLanguage', descKey: 'features.localLanguageDesc' },
  { titleKey: 'features.quickSetup', descKey: 'features.quickSetupDesc' },
  { titleKey: 'features.hyperlocal', descKey: 'features.hyperlocalDesc' },
  { titleKey: 'features.moreSales', descKey: 'features.moreSalesDesc' },
]

/**
 * FeatureStrip - Simple feature icons with text, language-first and mobile-first
 */
export default function FeatureStrip() {
  const { t } = useLanguage()
  const icons = [
    <svg key="1" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
    </svg>,
    <svg key="2" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
    <svg key="3" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>,
    <svg key="4" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>,
  ]
  return (
    <div className="w-full bg-gradient-to-r from-indigo-50 via-white to-indigo-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {featureKeys.map((fk, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-2"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                {icons[index]}
              </div>
              <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">
                  {t(fk.titleKey)}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  {t(fk.descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
