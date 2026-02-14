import { useLanguage } from '../../i18n'

const businessTypeKeys = [
  { id: 'retail', labelKey: 'form.businessRetail', descKey: 'form.businessRetailDesc' },
  { id: 'online', labelKey: 'form.businessOnline', descKey: 'form.businessOnlineDesc' },
  { id: 'hybrid', labelKey: 'form.businessHybrid', descKey: 'form.businessHybridDesc' },
]

/**
 * BusinessTypeCards - Card-based selector for business types
 */
export default function BusinessTypeCards({ value, onChange }) {
  const { t } = useLanguage()
  return (
    <div>
      <p className="block text-sm font-medium text-gray-700 mb-3">
        {t('form.businessType')}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {businessTypeKeys.map((type) => {
          const isActive = value === type.id
          return (
            <button
              key={type.id}
              type="button"
              onClick={() => onChange(type.id)}
              className={`
                text-left rounded-xl border px-4 py-4 text-sm md:text-base transition shadow-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-200
                ${isActive
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
                  : 'border-gray-200 bg-white text-gray-900 hover:border-indigo-200 hover:bg-indigo-50/60'
                }
              `}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold">{t(type.labelKey)}</span>
                <span
                  className={`
                    inline-flex h-5 w-5 items-center justify-center rounded-full border text-xs font-medium
                    ${isActive
                      ? 'border-indigo-500 bg-indigo-600 text-white'
                      : 'border-gray-300 bg-white text-gray-400'
                    }
                  `}
                  aria-hidden="true"
                >
                  {isActive ? '✓' : ''}
                </span>
              </div>
              <p className="text-xs md:text-sm text-gray-600">
                {t(type.descKey)}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
