import CopyButton from '../Common/CopyButton'
import { useLanguage } from '../../i18n'

/**
 * PosterOutput - Display poster ad content
 */
export default function PosterOutput({ data = {} }) {
  const { t } = useLanguage()
  const { headline = '', description = '', offer = '', imageUrl = null } = data

  const posterText = `${headline}\n\n${description}${offer ? `\n\n${offer}` : ''}`

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900">
          {t('output.posterAd')}
        </h3>
        <CopyButton text={posterText} label={t('output.copyPoster')} variant="primary" />
      </div>

      {/* Poster Preview */}
      <div className="bg-gradient-to-br from-indigo-50 to-white border-2 border-indigo-200 rounded-xl p-6 md:p-8 shadow-lg">
        {imageUrl && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img 
              src={imageUrl} 
              alt="Poster" 
              className="w-full h-auto"
            />
          </div>
        )}
        
        <div className="space-y-4">
          {headline && (
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {headline}
            </h2>
          )}
          
          {description && (
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              {description}
            </p>
          )}
          
          {offer && (
            <div className="bg-indigo-100 border-l-4 border-indigo-600 p-4 rounded">
              <p className="text-lg md:text-xl font-semibold text-indigo-900">
                {offer}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Raw Text Output */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <p className="text-sm font-medium text-gray-700 mb-2">{t('output.textContent')}</p>
        <pre className="text-sm text-gray-600 whitespace-pre-wrap font-sans">
          {posterText || t('output.noContent')}
        </pre>
      </div>
    </div>
  )
}
