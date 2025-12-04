import { createRoot } from 'react-dom/client'
import App from './App'
import '@renderer/assets/tailwind.css'
import '@renderer/assets/global.scss'

createRoot(document.getElementById('root')!).render(<App />)
