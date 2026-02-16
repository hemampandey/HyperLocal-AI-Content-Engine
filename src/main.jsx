import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { I18nProviderWithTranslations } from './i18n'
import MainLayout from './layout/MainLayout'
import App from './App.jsx'
import AIAutomation from './pages/AIAutomation'
import Placeholder from './pages/Placeholder'
import Pricing from './pages/Pricing'
import Support from './pages/Support'
import CreateAd from './pages/CreateAd'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <App /> },
      { path: 'create', element: <CreateAd /> },
      { path: 'automation', element: <AIAutomation /> },
      { path: 'pricing', element: <Pricing/> },
      { path: 'support', element: <Support /> },
      { path: 'create-ad', element: <CreateAd /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nProviderWithTranslations>
      <RouterProvider router={router} />
    </I18nProviderWithTranslations>
  </StrictMode>,
)
