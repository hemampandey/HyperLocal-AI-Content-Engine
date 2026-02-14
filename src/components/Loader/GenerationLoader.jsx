import { useLanguage } from '../../i18n'

/**
 * GenerationLoader - Step-based loader for ad generation
 */
export default function GenerationLoader({
  currentStep = 0,
  steps = [],
  className = '',
}) {
  const { t } = useLanguage()
  return (
    <div className={`max-w-2xl mx-auto mb-12 md:mb-16 ${className}`}>
      <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-8 md:p-12 border border-indigo-100">
        <div className="space-y-8">
          {/* Progress Steps */}
          <div className="space-y-6">
            {steps.map((step, index) => {
              const isActive = index === currentStep
              const isCompleted = index < currentStep
              return (
                <div
                  key={index}
                  className={`flex items-start gap-4 transition-all duration-500 ${
                    isActive ? 'opacity-100' : 'opacity-50'
                  }`}
                >
                  {/* Step Indicator */}
                  <div className="shrink-0 mt-1">
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                        isCompleted
                          ? 'bg-indigo-600 border-indigo-600'
                          : isActive
                            ? 'bg-indigo-100 border-indigo-600 animate-pulse'
                            : 'bg-white border-gray-300'
                      }`}
                    >
                      {isCompleted ? (
                        <svg
                          className="w-6 h-6 md:w-7 md:h-7 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <span
                          className={`text-sm md:text-base font-semibold ${
                            isActive
                              ? 'text-indigo-600'
                              : 'text-gray-400'
                          }`}
                        >
                          {index + 1}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Step Text */}
                  <div className="flex-1 pt-2">
                    <p
                      className={`text-base md:text-lg font-medium transition-all duration-500 ${
                        isActive
                          ? 'text-gray-900'
                          : isCompleted
                            ? 'text-gray-700'
                            : 'text-gray-400'
                      }`}
                    >
                      {step.text}
                    </p>
                  </div>

                  {/* Animated Dot */}
                  {isActive && (
                    <div className="shrink-0 pt-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"
                          style={{ animationDelay: '0.1s' }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"
                          style={{ animationDelay: '0.2s' }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Progress Bar */}
          <div className="pt-4">
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              {t('loader.stepOf', { current: currentStep + 1, total: steps.length })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
