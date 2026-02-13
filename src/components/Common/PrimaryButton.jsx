/**
 * PrimaryButton - Reusable primary action button component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {Function} props.onClick - Click handler
 * @param {boolean} props.disabled - Disabled state
 * @param {string} props.className - Additional CSS classes
 */
export default function PrimaryButton({ children, onClick, disabled = false, className = '' }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        font-semibold py-4 px-8 md:py-5 md:px-12 rounded-lg text-lg md:text-xl shadow-lg 
        transition-all duration-300
        ${disabled
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-xl transform hover:scale-105 cursor-pointer'
        }
        ${className}
      `}
    >
      {children}
    </button>
  )
}
