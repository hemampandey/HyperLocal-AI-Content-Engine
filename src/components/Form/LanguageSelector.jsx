import { useEffect } from 'react'

/**
 * LanguageSelector - Auto-fill capable language selector (no API)
 * @param {Object} props
 * @param {string} props.value - Selected language
 * @param {Function} props.onChange - Change handler
 * @param {string} props.autoDetectedLanguage - Auto-detected language (optional)
 * @param {string} props.label - Label text
 * @param {string} props.id - Select ID
 */
export default function LanguageSelector({ 
  value, 
  onChange, 
  autoDetectedLanguage,
  label = "Language",
  id = "language-select"
}) {
  const languages = [
    { value: '', label: 'Select language' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Marathi', label: 'Marathi' },
    { value: 'Gujarati', label: 'Gujarati' },
    { value: 'Tamil', label: 'Tamil' },
    { value: 'Telugu', label: 'Telugu' },
    { value: 'Kannada', label: 'Kannada' },
    { value: 'Malayalam', label: 'Malayalam' },
    { value: 'Bengali', label: 'Bengali' },
    { value: 'Punjabi', label: 'Punjabi' },
    { value: 'Odia', label: 'Odia' },
    { value: 'Assamese', label: 'Assamese' },
    { value: 'English', label: 'English' }
  ]

  // Auto-fill if autoDetectedLanguage is provided and value is empty
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
        {label}
        {autoDetectedLanguage && (
          <span className="ml-2 text-xs text-indigo-600 font-normal">
            (Auto-detected: {autoDetectedLanguage})
          </span>
        )}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm md:text-base text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  )
}
