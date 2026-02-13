import CopyButton from '../Common/CopyButton'

/**
 * InstagramOutput - Display Instagram post content
 * @param {Object} props
 * @param {Object} props.data - Instagram data object
 * @param {string} props.data.caption - Instagram caption
 * @param {Array} props.data.hashtags - Array of hashtags
 * @param {string} props.data.imageUrl - Optional image URL
 */
export default function InstagramOutput({ data = {} }) {
  const { caption = '', hashtags = [], imageUrl = null } = data

  const hashtagsText = hashtags.length > 0 ? '\n\n' + hashtags.map(tag => `#${tag}`).join(' ') : ''
  const instagramText = `${caption}${hashtagsText}`

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900">
          Instagram Post
        </h3>
        <CopyButton text={instagramText} label="Instagram" variant="primary" />
      </div>

      {/* Instagram Post Preview */}
      <div className="max-w-md mx-auto bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
        {imageUrl && (
          <div className="aspect-square bg-gray-100">
            <img 
              src={imageUrl} 
              alt="Instagram post" 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-indigo-600 font-semibold">@</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Your Business</p>
              <p className="text-xs text-gray-500">Location</p>
            </div>
          </div>
          
          <div className="space-y-2">
            {caption && (
              <p className="text-sm text-gray-900 whitespace-pre-wrap">
                {caption}
              </p>
            )}
            
            {hashtags.length > 0 && (
              <p className="text-sm text-indigo-600">
                {hashtags.map(tag => `#${tag}`).join(' ')}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Raw Text Output */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <p className="text-sm font-medium text-gray-700 mb-2">Caption & Hashtags:</p>
        <pre className="text-sm text-gray-600 whitespace-pre-wrap font-sans">
          {instagramText || 'No content available'}
        </pre>
      </div>
    </div>
  )
}
