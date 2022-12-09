import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages'

export const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
)
