import { AddCard, Dashboard, Logout } from '@mui/icons-material'
import { Divider } from '@mui/material'
import { useAppContext } from '../../contexts'
import { useApp } from '../../hooks'
import { logout } from '../../firebase'

export const useNav = () => {
  const { clearContext } = useAppContext()
  const { handleNewTransaction } = useApp()

  const navItems = [
    {
      name: 'Dashboard',
      icon: Dashboard,
      to: '/'
    },
    {
      name: 'Adicionar Transação',
      icon: AddCard,
      to: '/submit/create',
      handleClick: () => handleNewTransaction()
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
