/**
 * SectionContainer - Reusable container component for sections
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.withBackground - Whether to apply background styling
 */
export default function SectionContainer({ children, className = '', withBackground = true }) {
  const baseClasses = withBackground
    ? 'bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-6 md:p-8 border border-indigo-50'
    : ''

  return (
    <div className={`${baseClasses} ${className}`}>
      {children}
    </div>
  )
}
