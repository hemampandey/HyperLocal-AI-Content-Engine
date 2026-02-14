import { useContext } from 'react'
import { I18nContext } from './I18nContext'

export function useLanguage() {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within I18nProvider')
  }
  return ctx
}
