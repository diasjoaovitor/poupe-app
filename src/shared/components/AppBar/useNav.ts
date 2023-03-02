import { Dashboard, Logout } from '@mui/icons-material'
import { Divider } from '@mui/material'
import { useAppContext } from '../../contexts'
import { logout } from '../../firebase'

export const useNav = () => {
  const { clearContext } = useAppContext()

  const navItems = [
    {
      name: 'Dashboard',
      icon: Dashboard,
      to: '/'
    },
    {
      name: 'Logout',
      icon: Logout,
      to: '/',
      divider: Divider,
      handleClick: async () => {
        await logout()
        clearContext()
      }
    }
  ]

  return navItems
}
