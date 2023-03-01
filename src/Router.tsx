import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Auth, Dashboard, Submit } from './pages'
import { PrivateRoute } from './shared/contexts'

export const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<Dashboard />} />
      </Route>
      <Route path="/submit/:method" element={<PrivateRoute />}>
        <Route path="/submit/:method" element={<Submit />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
