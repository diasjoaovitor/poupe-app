import { useState } from 'react'
import { AppBar as MUIAppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { GitHub, Logout, Menu } from '@mui/icons-material'
import { Title } from '..'
import { logout } from '../../firebase'
import * as S from './style'

const navItems = [
  {
    name: 'Logout',
    icon: Logout,
    handleClick: logout
  },
  {
    name: 'GitHub',
    icon: GitHub,
    href: 'https://github.com/diasjoaovitor/poupe-app'
  }
]

type NavItemsProps = {
  type: 'mobile' | 'desktop'
}

const NavItems: React.FC<NavItemsProps> = ({ type }) => (
  <List sx={type === 'mobile' ? S.navItemsMobile : S.navItemsDesktop}>
    {navItems.map(({ name, icon: Icon, handleClick, href }) => {
      const props = handleClick ? {
        component: 'li',
        key: name, 
        disablePadding: true,
        onClick: handleClick
      }: {
        component: 'a',
        key: name, 
        disablePadding: true,
        href,
        target: '_blank'
      }

      return (
        <ListItem {...props}>
          <ListItemButton>
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItemButton>
        </ListItem>
      )
    })}
  </List>
)

export const AppBar: React.FC = () => {
  const [ mobileOpen, setMobileOpen ] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  return (
    <>
    <MUIAppBar component="nav" sx={S.appBar}>
      <Toolbar>
        <IconButton className="menu-icon" onClick={handleDrawerToggle}>
          <Menu />
        </IconButton>
        <Title color="dark" variant="h6" />
        <NavItems type="desktop" />
      </Toolbar>
    </MUIAppBar>
    <Box component="nav">
      <Drawer
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={S.drawer}
      >
        <Box onClick={handleDrawerToggle}>
          <Title color="dark" variant="h6" />
          <Divider />
          <NavItems type="mobile" />
        </Box>
      </Drawer>
    </Box>
    <Toolbar />
    </>
  )
}
