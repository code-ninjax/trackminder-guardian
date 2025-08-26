import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from '@/components/ThemeProvider'

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light" storageKey="child-tracker-theme">
    <App />
  </ThemeProvider>
);
