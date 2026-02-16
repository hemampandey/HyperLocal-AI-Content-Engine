import CopyButton from '../Common/CopyButton'
import { useLanguage } from '../../i18n'

export default function WhatsAppOutput({ data = {} }) {
  const { t } = useLanguage()

  const {
    message = '',
    businessName = ''
  } = data

  const displayName = businessName || t('output.yourBusiness')

  // SAFE first letter
  const firstLetter =
    (businessName || t('output.yourBusiness') || '')
      .charAt(0)
      .toUpperCase()

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900">
          {t('output.whatsappMessage')}
        </h3>
        <CopyButton
          text={message}
          label={t('output.copyWhatsApp')}
          variant="primary"
        />
      </div>

      <div className="max-w-md mx-auto bg-gray-100 rounded-lg p-4 space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-gray-300">
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              {firstLetter}
            </span>
          </div>
          <div>
            <p className="font-semibold text-gray-900">{displayName}</p>
            <p className="text-xs text-gray-500">
              {t('output.online')}
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="max-w-[80%] bg-green-500 rounded-lg rounded-tr-none p-3 shadow-sm">
            <p className="text-sm text-white whitespace-pre-wrap">
              {message || t('output.noMessage')}
            </p>
            <p className="text-xs text-green-100 mt-1 text-right">
              {new Date().toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <p className="text-sm font-medium text-gray-700 mb-2">
          {t('output.messageText')}
        </p>
        <pre className="text-sm text-gray-600 whitespace-pre-wrap font-sans">
          {message || t('output.noContent')}
        </pre>
      </div>
    </div>
  )
}