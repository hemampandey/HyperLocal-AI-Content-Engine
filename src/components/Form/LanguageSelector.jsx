import { useEffect } from 'react'
import { useLanguage } from '../../i18n'

const adContentLanguages = [
  { value: '', labelKey: 'form.selectLanguage' },
  { value: 'Hindi', labelKey: 'languages.hi' },
  { value: 'Marathi', labelKey: 'languages.mr' },
  { value: 'Gujarati', labelKey: 'form.language' },
  { value: 'Tamil', labelKey: 'languages.ta' },
  { value: 'Telugu', labelKey: 'languages.te' },
  { value: 'Kannada', labelKey: 'form.language' },
  { value: 'Malayalam', labelKey: 'form.language' },
  { value: 'Bengali', labelKey: 'languages.bn' },
  { value: 'Punjabi', labelKey: 'form.language' },
  { value: 'Odia', labelKey: 'form.language' },
  { value: 'Assamese', labelKey: 'form.language' },
  { value: 'English', labelKey: 'languages.en' },
]

/**
 * LanguageSelector - Ad content language (for generated ads), not UI language
 */
export default function LanguageSelector({
  value,
  onChange,
  autoDetectedLanguage,
  id = 'language-select',
}) {
  const { t } = useLanguage()

  useEffect(() => {
    if (autoDetectedLanguage && !value) {
      onChange(autoDetectedLanguage)
    }
  }, [autoDetectedLanguage, value, onChange])

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {t('form.language')}
        {autoDetectedLanguage && (
          <span className="ml-2 text-xs text-indigo-600 font-normal">
            ({t('form.languageAuto', { lang: autoDetectedLanguage })})
          </span>
        )}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm md:text-base text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
      >
        {adContentLanguages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.labelKey === 'form.language' ? lang.value : t(lang.labelKey)}
          </option>
        ))}
      </select>
    </div>
  )
}
