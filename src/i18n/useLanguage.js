import { useState, useEffect, useCallback } from 'react'
import {
  translations,
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  getNested,
  interpolate,
} from './index'

const STORAGE_KEY = 'app-locale'

/**
 * Map browser language code to our locale (hi, en, ta, te, bn, mr)
 * @param {string} browserLang - e.g. 'en-IN', 'hi', 'ta'
 * @returns {string}
 */
function getLocaleFromBrowser(browserLang) {
  if (!browserLang || typeof browserLang !== 'string') return DEFAULT_LOCALE
  const code = browserLang.split('-')[0].toLowerCase()
  const map = {
    hi: 'hi',
    en: 'en',
    ta: 'ta',
    te: 'te',
    bn: 'bn',
    mr: 'mr',
  }
  return map[code] && SUPPORTED_LOCALES.includes(map[code]) ? map[code] : DEFAULT_LOCALE
}

/**
 * Central language hook: persist in localStorage, auto-detect on first load.
 * @returns {{ language: string, setLanguage: (locale: string) => void, t: (key: string, params?: Object) => string }}
 */
export function useLanguage() {
  const [language, setLanguageState] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_LOCALE
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && SUPPORTED_LOCALES.includes(stored)) return stored
    return getLocaleFromBrowser(navigator.language || navigator.userLanguage)
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (SUPPORTED_LOCALES.includes(language)) {
      localStorage.setItem(STORAGE_KEY, language)
    }
  }, [language])

  const setLanguage = useCallback((locale) => {
    if (SUPPORTED_LOCALES.includes(locale)) {
      setLanguageState(locale)
    }
  }, [])

  const t = useCallback(
    (key, params) => {
      const dict = translations[language] || translations[DEFAULT_LOCALE]
      const value = getNested(dict, key)
      const str = value != null ? value : key
      return params && typeof str === 'string' ? interpolate(str, params) : str
    },
    [language]
  )

  return { language, setLanguage, t }
}
