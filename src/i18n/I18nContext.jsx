import { createContext, useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'app_language'
const SUPPORTED = ['hi', 'en', 'ta', 'te', 'bn', 'mr']
const DEFAULT_LANG = 'hi'

// Map browser language to our codes
function getBrowserLang() {
  const browser = (navigator.language || navigator.userLanguage || '').toLowerCase()
  if (!browser) return DEFAULT_LANG
  const code = browser.split('-')[0]
  if (SUPPORTED.includes(code)) return code
  if (browser.startsWith('en')) return 'en'
  return DEFAULT_LANG
}

function getStoredOrBrowserLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && SUPPORTED.includes(stored)) return stored
  } catch (_) {}
  return getBrowserLang()
}

export const I18nContext = createContext({
  language: DEFAULT_LANG,
  setLanguage: () => {},
  t: (key) => key,
})

export function I18nProvider({ children, translations }) {
  const [language, setLanguageState] = useState(DEFAULT_LANG)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    setLanguageState(getStoredOrBrowserLang())
    setInitialized(true)
  }, [])

  const setLanguage = useCallback((lang) => {
    if (!SUPPORTED.includes(lang)) return
    setLanguageState(lang)
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch (_) {}
  }, [])

  const t = useCallback(
    (key, vars = null) => {
      if (!initialized || !translations || !translations[language]) return key
      const data = translations[language]
      let value = key.split('.').reduce((obj, k) => obj?.[k], data)
      if (typeof value !== 'string') return key
      if (vars && typeof vars === 'object') {
        Object.keys(vars).forEach((k) => {
          value = value.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), String(vars[k]))
        })
      }
      return value
    },
    [language, initialized, translations]
  )

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  )
}
