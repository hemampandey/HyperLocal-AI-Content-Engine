import { useLanguage } from '../../i18n'

/**
 * ProductInput - Text input for product name with Indian examples
 */
export default function ProductInput({ value, onChange, id = 'product-name' }) {
  const { t } = useLanguage()
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {t('form.productName')}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={t('form.productPlaceholder')}
        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm md:text-base text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
      />
    </div>
  )
}
