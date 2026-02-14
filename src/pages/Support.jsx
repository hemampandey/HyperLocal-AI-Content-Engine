import SectionContainer from '../components/Common/SectionContainer'
import PrimaryButton from '../components/Common/PrimaryButton'
import CopyButton from '../components/Common/CopyButton'
import { useLanguage } from '../i18n'

function Support() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 py-16 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('support.title')}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We're here to help you create high-performing hyperlocal campaigns.
          </p>
        </div>

        <SectionContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Email Support */}
            <div className="p-6 rounded-xl bg-gray-50 border border-gray-200 hover:border-indigo-200 transition">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t('support.emailSupport')}
                </h3>
                <CopyButton
                  text={t('support.emailValue')}
                  label={t('support.emailSupport')}
                  variant="icon"
                />
              </div>
              <p className="text-gray-600 mb-2">
                {t('support.emailValue')}
              </p>
              <p className="text-sm text-gray-500">
                {t('support.responseTime')}
              </p>
            </div>

            {/* Live Chat */}
            <div className="p-6 rounded-xl bg-gray-50 border border-gray-200 hover:border-indigo-200 transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {t('support.liveChat')}
              </h3>
              <p className="text-gray-600">
                {t('support.liveChatHours')}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {t('support.liveChatDays')}
              </p>
            </div>

            {/* Documentation */}
            <div className="p-6 rounded-xl bg-gray-50 border border-gray-200 hover:border-indigo-200 transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {t('support.documentation')}
              </h3>
              <p className="text-gray-600">
                {t('support.documentationDesc')}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {t('support.documentationSub')}
              </p>
            </div>

            {/* Community */}
            <div className="p-6 rounded-xl bg-gray-50 border border-gray-200 hover:border-indigo-200 transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {t('support.communityForum')}
              </h3>
              <p className="text-gray-600">
                {t('support.communityForumDesc')}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {t('support.communityForumSub')}
              </p>
            </div>

          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <PrimaryButton>
              {t('cta.getStarted')}
            </PrimaryButton>
          </div>

        </SectionContainer>
      </div>
    </div>
  )
}

export default Support
