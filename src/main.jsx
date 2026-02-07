import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css' // Optional: keep for global resets
import './styles/tailwind.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
