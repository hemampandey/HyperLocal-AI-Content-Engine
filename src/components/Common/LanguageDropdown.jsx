import { useI18n } from '../../i18n/I18nContext'
import { SUPPORTED_LOCALES } from '../../i18n'

/**
 * LanguageDropdown - UI language selector (instant switch, persisted in localStorage).
 * Renders a select with supported locales; each option shows native language name.
 */
export default function LanguageDropdown() {
  const { language, setLanguage, t } = useI18n()

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="ui-language" className="text-sm font-medium text-gray-700 sr-only">
        {t('ui.language')}
      </label>
      <select
        id="ui-language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition cursor-pointer"
        aria-label={t('ui.language')}
      >
        {SUPPORTED_LOCALES.map((locale) => (
          <option key={locale} value={locale}>
            {t(`ui.languageName_${locale}`)}
          </option>
        ))}
      </select>
    </div>
  )
}
