import { Router } from './Router'
import { AuthProvider, ThemeProvider } from './shared/contexts'

const App: React.FC = () => (
  <ThemeProvider>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </ThemeProvider>
)

export default App
