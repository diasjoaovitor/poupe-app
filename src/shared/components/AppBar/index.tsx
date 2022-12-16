import { useState } from 'react'
import { AppBar as MUIAppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { Logout, Menu } from '@mui/icons-material'
import { logout } from '../../firebase'
import * as S from './style'

const navItems = [
  {
    name: 'Logout',
    icon: Logout,
    handleClick: logout
  }
]

type NavItemsProps = {
  type: 'mobile' | 'desktop'
}

const NavItems: React.FC<NavItemsProps> = ({ type }) => (
  <List sx={type === 'mobile' ? S.navItemsMobile : S.navItemsDesktop}>
    {navItems.map(({ name, icon: Icon, handleClick }) => (
      <ListItem key={name} disablePadding onClick={handleClick}>
        <ListItemButton>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItemButton>
      </ListItem>
    ))}
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
        <Typography component="h1" variant="h6">
          Poupe App
        </Typography>
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
          <Typography component="h1" variant="h6">
            Poupe App
          </Typography>
          <Divider />
          <NavItems type="mobile" />
        </Box>
      </Drawer>
    </Box>
    </>
  )
}
