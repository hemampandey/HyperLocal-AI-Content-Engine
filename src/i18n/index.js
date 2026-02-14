/**
 * i18n - JSON-based translations, no backend.
 * Supported: hi (default), en, ta, te, bn, mr
 */

import hi from './translations/hi.json'
import en from './translations/en.json'
import ta from './translations/ta.json'
import te from './translations/te.json'
import bn from './translations/bn.json'
import mr from './translations/mr.json'

export const SUPPORTED_LOCALES = ['hi', 'en', 'ta', 'te', 'bn', 'mr']
export const DEFAULT_LOCALE = 'hi'

export const translations = {
  hi,
  en,
  ta,
  te,
  bn,
  mr,
}

/**
 * Get nested value by dot path, e.g. 'hero.headline'
 * @param {Object} obj - Flat or nested object
 * @param {string} path - Dot-separated key
 * @returns {string|undefined}
 */
export function getNested(obj, path) {
  if (!path || !obj) return undefined
  const keys = path.split('.')
  let current = obj
  for (const key of keys) {
    if (current == null || typeof current !== 'object') return undefined
    current = current[key]
  }
  return typeof current === 'string' ? current : undefined
}

/**
 * Replace {placeholder} in string with values from params
 * @param {string} str
 * @param {Record<string, string|number>} params
 * @returns {string}
 */
export function interpolate(str, params = {}) {
  if (typeof str !== 'string') return ''
  return str.replace(/\{(\w+)\}/g, (_, key) =>
    params[key] != null ? String(params[key]) : `{${key}}`
  )
}
