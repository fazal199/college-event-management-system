import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './AppRouter.tsx'
import './global.css'
import { ThemeProvider } from './contexts/ThemeProvider.tsx'
import { Provider } from 'react-redux'
import { store } from './lib/redux/store.ts'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { InterStatusWrapper } from './contexts/InterStatusWrapper.tsx'

// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
 
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <InterStatusWrapper>
            <RouterProvider router={router} />
          </InterStatusWrapper>
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  
)
