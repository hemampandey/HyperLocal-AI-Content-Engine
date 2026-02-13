/**
 * OutputTabs - Tab navigation for different output formats
 * @param {Object} props
 * @param {number} props.activeTab - Currently active tab index
 * @param {Function} props.onTabChange - Tab change handler (receives tab index)
 * @param {Array} props.tabs - Array of tab objects with id and label
 */
export default function OutputTabs({ 
  activeTab = 0, 
  onTabChange,
  tabs = [
    { id: 0, label: 'Poster' },
    { id: 1, label: 'Instagram' },
    { id: 2, label: 'WhatsApp' },
    { id: 3, label: 'Voice' }
  ]
}) {
  return (
    <div className="border-b border-gray-200">
      <div className="flex flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex-1 min-w-[120px] px-4 md:px-6 py-4 text-sm md:text-base font-medium 
              transition-all duration-300 border-b-2
              ${activeTab === tab.id
                ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
