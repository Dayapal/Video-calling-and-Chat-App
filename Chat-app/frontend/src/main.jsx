import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient,  QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'
const queryClient = new QueryClient();


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
