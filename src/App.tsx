import { Router } from './Router'
import { ThemeProvider } from './shared/contexts'

const App: React.FC = () => (
  <ThemeProvider>
    <Router />
  </ThemeProvider>
)

export default App
