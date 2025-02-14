import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { KanjiProvider } from './Components/Context.jsx'

createRoot(document.getElementById('root')).render(
  <KanjiProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </KanjiProvider>,
)
