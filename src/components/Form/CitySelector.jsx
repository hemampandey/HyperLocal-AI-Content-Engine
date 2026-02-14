import { useState, useRef, useEffect } from 'react'
import { getAllCities, getLanguageForCity } from '../../data/cityLanguageMap'

/**
 * CitySelector - Searchable dropdown with static city list
 * @param {Object} props
 * @param {string} props.value - Selected city
 * @param {Function} props.onChange - Change handler (receives city name)
 * @param {Function} props.onLanguageChange - Optional handler for language changes
 * @param {string} props.label - Label text
 * @param {string} props.id - Input ID
 */
export default function CitySelector({
  value,
  onChange,
  onLanguageChange,
  label = 'City',
  cityPlaceholder = 'Search for your city...',
  noCitiesFoundTemplate = 'No cities found matching "{query}"',
  languageLabel = 'Language',
  id = 'city-search',
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const allCities = getAllCities()
  const filteredCities = searchQuery
    ? allCities.filter((city) =>
        city.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allCities

  const handleCitySelect = (city) => {
    onChange(city)
    const language = getLanguageForCity(city)
    if (onLanguageChange) {
      onLanguageChange(language)
    }
    setSearchQuery('')
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="text"
          value={searchQuery || value}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setIsOpen(true)
            if (value && e.target.value !== value) {
              onChange('')
              if (onLanguageChange) {
                onLanguageChange('')
              }
            }
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={cityPlaceholder}
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 pr-10 text-sm md:text-base text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
        />
        <svg
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Language display */}
      {value && (
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs text-gray-500">{languageLabel}:</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            {getLanguageForCity(value)}
          </span>
        </div>
      )}

      {/* Dropdown list */}
      {isOpen && filteredCities.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {filteredCities.map((city) => {
            const cityLanguage = getLanguageForCity(city)
            return (
              <button
                key={city}
                type="button"
                onClick={() => handleCitySelect(city)}
                className="w-full text-left px-4 py-3 hover:bg-indigo-50 transition-colors border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm md:text-base text-gray-900 font-medium">
                    {city}
                  </span>
                  <span className="text-xs text-gray-500">
                    {cityLanguage}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {/* No results message */}
      {isOpen && searchQuery && filteredCities.length === 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
          <p className="text-sm text-gray-500 text-center">
            {noCitiesFoundTemplate.replace('{query}', searchQuery)}
          </p>
        </div>
      )}
    </div>
  )
}
