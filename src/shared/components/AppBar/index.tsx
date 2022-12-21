import { useState } from 'react'
import { AppBar as MUIAppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIconTypeMap, Toolbar } from '@mui/material'
import { GitHub, Logout, Menu } from '@mui/icons-material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { Title } from '..'
import { logout } from '../../firebase'
import * as S from './style'

type NavItemsProps = {
  name: string
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>
  props: {
    component: 'a' | 'li'
    onClick?: () => any
    href?: string
    role?: 'link'
  }
}[]

const navItems: NavItemsProps = [
  {
    name: 'Logout',
    icon: Logout,
    props: {
      component: 'li',
      onClick: logout
    }
  },
  {
    name: 'GitHub',
    icon: GitHub,
    props: {
      component: 'a',
      href: 'https://github.com/diasjoaovitor/poupe-app',
      role: 'link'
    }
  }
]

type NavListProps = {
  type: 'mobile' | 'desktop'
  items: NavItemsProps
}


export const NavList: React.FC<NavListProps> = ({ type, items }) => (
  <List sx={type === 'mobile' ? S.navItemsMobile : S.navItemsDesktop}>
    {items.map(item => {
      const { name, icon: Icon, props } = item
      return (
        <ListItem key={name} disablePadding {...props}>
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
        <NavList items={navItems} type="desktop" />
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
          <NavList items={navItems} type="mobile" />
        </Box>
      </Drawer>
    </Box>
    <Toolbar />
    </>
  )
}
