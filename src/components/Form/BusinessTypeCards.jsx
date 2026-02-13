/**
 * BusinessTypeCards - Card-based selector for business types (kirana, boutique, etc.)
 * @param {Object} props
 * @param {string} props.value - Selected value
 * @param {Function} props.onChange - Change handler (receives business type ID)
 */
export default function BusinessTypeCards({ value, onChange }) {
  const businessTypes = [
    {
      id: 'retail',
      label: 'Retail store',
      labelHindi: 'Retail Store',
      description: 'Physical shop attracting walk-in customers.',
      descriptionHindi: 'Physical dukaan jo walk-in customers attract karti hai.'
    },
    {
      id: 'online',
      label: 'Online only',
      labelHindi: 'Sirf Online',
      description: 'Sell via website, app, or marketplaces.',
      descriptionHindi: 'Website, app, ya marketplaces se becho.'
    },
    {
      id: 'hybrid',
      label: 'Online + store',
      labelHindi: 'Online + Dukaan',
      description: 'Combine online orders with in-store sales.',
      descriptionHindi: 'Online orders aur in-store sales dono.'
    }
  ]

  return (
    <div>
      <p className="block text-sm font-medium text-gray-700 mb-3">
        Business type
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {businessTypes.map((type) => {
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
                <span className="font-semibold">{type.labelHindi || type.label}</span>
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
                {type.descriptionHindi || type.description}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
