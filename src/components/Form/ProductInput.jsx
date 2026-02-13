/**
 * ProductInput - Text input for product name with Indian examples
 * @param {Object} props
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Change handler
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.label - Label text
 * @param {string} props.id - Input ID
 */
export default function ProductInput({ 
  value, 
  onChange, 
  placeholder = "e.g. Premium South Indian Filter Coffee Pack, Handmade Jute Bags, Fresh Vegetables",
  label = "Product name",
  id = "product-name"
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
        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm md:text-base text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
      />
    </div>
  )
}
