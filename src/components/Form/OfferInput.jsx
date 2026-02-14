import { useLanguage } from '../../i18n'

/**
 * OfferInput - Input for special offers/promotions
 */
export default function OfferInput({ value, onChange, maxLength = 150, id = 'offer' }) {
  const { t } = useLanguage()
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {t('form.specialOffer')}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={t('form.offerPlaceholder')}
        maxLength={maxLength}
        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm md:text-base text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
      />
      <p className="mt-1 text-xs text-gray-500">
        {t('form.characters', { count: value.length, max: maxLength })}
      </p>
    </div>
  )
}
