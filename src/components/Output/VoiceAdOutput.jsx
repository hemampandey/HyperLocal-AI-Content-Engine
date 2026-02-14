import { useI18n } from '../../i18n/I18nContext'
import CopyButton from '../Common/CopyButton'

/**
 * VoiceAdOutput - Display voice ad script with duration
 * @param {Object} props
 * @param {Object} props.data - Voice ad data object
 * @param {string} props.data.script - Voice ad script
 * @param {number} props.data.duration - Duration in seconds
 * @param {string} props.data.language - Language of the script
 */
export default function VoiceAdOutput({ data = {} }) {
  const { t } = useI18n()
  const { script = '', duration = 0, language = 'Hindi' } = data

  const formatDuration = (seconds) => {
    if (seconds < 60) {
      return t('output.seconds', { count: seconds })
    }
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900">
          {t('output.voiceScript')}
        </h3>
        <CopyButton text={script} label={t('output.voice')} variant="primary" />
      </div>

      {/* Voice Ad Preview */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl p-6 md:p-8 shadow-lg">
        {/* Duration Badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('output.language')}</p>
              <p className="font-semibold text-gray-900">{language}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
            <p className="text-xs text-gray-600">{t('output.duration')}</p>
            <p className="text-lg font-bold text-purple-600">
              {formatDuration(duration)}
            </p>
          </div>
        </div>

        {/* Script Content */}
        <div className="bg-white rounded-lg p-6 border border-purple-100">
          <p className="text-base md:text-lg text-gray-900 leading-relaxed whitespace-pre-wrap">
            {script || t('output.noScript')}
          </p>
        </div>

        {/* Reading Guide */}
        <div className="mt-4 p-4 bg-purple-100 rounded-lg">
          <p className="text-sm text-purple-900">
            {t('output.tipVoice')}
          </p>
        </div>
      </div>

      {/* Raw Text Output */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <p className="text-sm font-medium text-gray-700 mb-2">{t('output.scriptText')}</p>
        <pre className="text-sm text-gray-600 whitespace-pre-wrap font-sans">
          {script || t('output.noContent')}
        </pre>
      </div>
    </div>
  )
}
