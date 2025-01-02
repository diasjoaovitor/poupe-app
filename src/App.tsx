import { QueryClient, QueryClientProvider } from 'react-query'
import { Router } from './Router'
import { AuthProvider, ThemeProvider, AppProvider } from './shared/contexts'

const queryClient = new QueryClient()

const App: React.FC = () => (
  <ThemeProvider>
    <AuthProvider>
      <AppProvider>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </AppProvider>
    </AuthProvider>
  </ThemeProvider>
)

export default App
