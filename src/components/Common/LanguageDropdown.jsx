import { useLanguage } from '../../i18n'

/**
 * LanguageDropdown - UI language selector (app interface language)
 * Renders a dropdown to switch between hi, en, ta, te, bn, mr.
 */
export default function LanguageDropdown({ className = '' }) {
  const { language, setLanguage, t } = useLanguage()

  const languages = [
    { code: 'hi', labelKey: 'languages.hi' },
    { code: 'en', labelKey: 'languages.en' },
    { code: 'ta', labelKey: 'languages.ta' },
    { code: 'te', labelKey: 'languages.te' },
    { code: 'bn', labelKey: 'languages.bn' },
    { code: 'mr', labelKey: 'languages.mr' },
  ]

  return (
    <div className={className}>
      <label htmlFor="ui-language" className="sr-only">
        {t('form.language')}
      </label>
      <select
        id="ui-language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
        aria-label={t('form.language')}
      >
        {languages.map(({ code, labelKey }) => (
          <option key={code} value={code}>
            {t(labelKey)}
          </option>
        ))}
      </select>
    </div>
  )
}
