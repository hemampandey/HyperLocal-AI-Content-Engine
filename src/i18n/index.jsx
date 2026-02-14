import { I18nProvider } from './I18nContext'
import hi from './translations/hi.json'
import en from './translations/en.json'
import ta from './translations/ta.json'
import te from './translations/te.json'
import bn from './translations/bn.json'
import mr from './translations/mr.json'

export const translations = { hi, en, ta, te, bn, mr }
export { I18nProvider } from './I18nContext'
export { useLanguage } from './useLanguage'

export function I18nProviderWithTranslations({ children }) {
  return (
    <I18nProvider translations={translations}>
      {children}
    </I18nProvider>
  )
}
