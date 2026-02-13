/**
 * OfferInput - Input for special offers/promotions
 * @param {Object} props
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Change handler
 * @param {number} props.maxLength - Maximum character length
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.label - Label text
 * @param {string} props.id - Input ID
 */
export default function OfferInput({ 
  value, 
  onChange, 
  maxLength = 150,
  placeholder = "e.g. 20% off on all items, Buy 2 Get 1 Free, Flat ₹500 off above ₹2000, Festival Special: 30% discount, Free delivery within 5km",
  label = "Special offer",
  id = "offer"
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm md:text-base text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
      />
      <p className="mt-1 text-xs text-gray-500">
        {value.length}/{maxLength} characters
      </p>
    </div>
  )
}
