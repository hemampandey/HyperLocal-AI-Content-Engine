import { useLanguage } from '../../i18n'

/**
 * CategorySelect - Fixed category dropdown
 */
export default function CategorySelect({ value, onChange, id = 'product-category' }) {
  const { t } = useLanguage()
  const categories = [
    { value: '', labelKey: 'form.selectCategory' },
    { value: 'food-beverage', labelKey: 'form.categoryFood' },
    { value: 'fashion', labelKey: 'form.categoryFashion' },
    { value: 'services', labelKey: 'form.categoryServices' },
    { value: 'health-beauty', labelKey: 'form.categoryHealth' },
    { value: 'electronics', labelKey: 'form.categoryElectronics' },
    { value: 'other', labelKey: 'form.categoryOther' },
  ]

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {t('form.productCategory')}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm md:text-base text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
      >
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {t(category.labelKey)}
          </option>
        ))}
      </select>
    </div>
  )
}
