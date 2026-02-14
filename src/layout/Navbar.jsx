import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import LanguageDropdown from '../components/Common/LanguageDropdown'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/create', label: 'Create Ad' },
  { to: '/automation', label: 'AI Automation', paid: true },
  { to: '/pricing', label: 'Pricing' },
  { to: '/support', label: 'Support' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-indigo-100 text-indigo-700'
        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/80 backdrop-blur-md">
      <nav className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 text-lg font-semibold text-gray-900 shrink-0">
            HyperLocal AI
          </NavLink>

          <div className="hidden md:flex md:items-center md:gap-1">
            {navItems.map(({ to, label, paid }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={linkClass}
              >
                <span className="inline-flex items-center gap-1.5">
                  {label}
                  {paid && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-800">
                      Pro
                    </span>
                  )}
                </span>
              </NavLink>
            ))}
          </div>

          <div className="hidden md:block">
            <LanguageDropdown />
          </div>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-gray-200 py-3 space-y-1">
            {navItems.map(({ to, label, paid }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
                onClick={() => setMobileOpen(false)}
              >
                <span className="inline-flex items-center gap-2">
                  {label}
                  {paid && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-800">
                      Pro
                    </span>
                  )}
                </span>
              </NavLink>
            ))}
            <div className="px-4 pt-2">
              <LanguageDropdown />
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
