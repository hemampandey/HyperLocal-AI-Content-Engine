import { useState } from 'react'
import { useLanguage } from '../../i18n'

/**
 * CopyButton - Reusable button for copying text to clipboard
 */
export default function CopyButton({ text, label = 'Text', className = '', variant = 'primary' }) {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr)
      }
      document.body.removeChild(textArea)
    }
  }

  const baseClasses = {
    primary: 'flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors',
    icon: 'p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0',
    ghost: 'flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors'
  }

  return (
    <button
      onClick={handleCopy}
      className={`${baseClasses[variant]} ${className}`}
      title={t('copy.copy', { label })}
    >
      {copied ? (
        <>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          {variant !== 'icon' && <span>{t('copy.copied')}</span>}
        </>
      ) : (
        <>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          {variant !== 'icon' && <span>{t('copy.copy', { label })}</span>}
        </>
      )}
    </button>
  )
}
