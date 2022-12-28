import { QueryClient, QueryClientProvider } from 'react-query'
import { Router } from './Router'
import { AuthProvider, ThemeProvider } from './shared/contexts'

const queryClient = new QueryClient()

const App: React.FC = () => (
  <ThemeProvider>
    <AuthProvider>
  		<QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </AuthProvider>
  </ThemeProvider>
)

export default App
