import { createContext, useContext } from 'react'
import { useLanguage } from './useLanguage'

const I18nContext = createContext(null)

/**
 * Provider that holds language state so all consumers share the same language.
 * Wrap the app (e.g. in main.jsx) with <I18nProvider>.
 */
export function I18nProvider({ children }) {
  const value = useLanguage()
  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}

/**
 * Use i18n in any component. Must be used inside I18nProvider.
 * @returns {{ language: string, setLanguage: (locale: string) => void, t: (key: string, params?: Object) => string }}
 */
export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return ctx
}
