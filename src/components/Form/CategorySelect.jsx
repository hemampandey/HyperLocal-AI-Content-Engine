/**
 * CategorySelect - Fixed category dropdown
 * @param {Object} props
 * @param {string} props.value - Selected value
 * @param {Function} props.onChange - Change handler
 * @param {string} props.label - Label text
 * @param {string} props.id - Select ID
 */
const DEFAULT_CATEGORIES = [
  { value: '', label: 'Select a category' },
  { value: 'food-beverage', label: 'Food & Beverages' },
  { value: 'fashion', label: 'Fashion & Accessories' },
  { value: 'services', label: 'Local Services' },
  { value: 'health-beauty', label: 'Health & Beauty' },
  { value: 'electronics', label: 'Electronics & Gadgets' },
  { value: 'other', label: 'Other' },
]

export default function CategorySelect({
  value,
  onChange,
  label = 'Product category',
  selectLabel = 'Select a category',
  categoryOptions = DEFAULT_CATEGORIES,
  id = 'product-category',
}) {
  const categories = [
    { value: '', label: selectLabel },
    ...categoryOptions,
  ]

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm md:text-base text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
      >
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  )
}
