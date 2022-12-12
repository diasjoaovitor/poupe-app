import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard, Login, Register } from './pages'
import { login, register } from './shared/firebase'

export const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login login={login} />} />
      <Route path="/register" element={<Register register={register} />} />
    </Routes>
  </BrowserRouter>
)
