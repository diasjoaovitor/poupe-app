import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard, Login, Register } from './pages'
import { PrivateRoute } from './shared/contexts'

export const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<Dashboard />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
