import { useState } from 'react'
import { AppBar as MUIAppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIconTypeMap, Toolbar } from '@mui/material'
import { GitHub, Logout, Menu, SvgIconComponent } from '@mui/icons-material'
import { Title } from '..'
import * as S from './style'

type NavItemsProps = {
  name: string
  icon: SvgIconComponent
  props: {
    component: 'a' | 'li'
    onClick?: () => any
    href?: string
    target?: '_blank'
    role?: 'link'
  }
}[]

const navItems = (handleLogout: () => void) => ([
  {
    name: 'Logout',
    icon: Logout,
    props: {
      component: 'li',
      onClick: handleLogout
    }
  },
  {
    name: 'GitHub',
    icon: GitHub,
    props: {
      component: 'a',
      href: 'https://github.com/diasjoaovitor/poupe-app',
      role: 'link',
      target: '_blank'
    }
  }
] as NavItemsProps)

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

type Props = {
  handleLogout(): void
}

export const AppBar: React.FC<Props> = ({ handleLogout }) => {
  const [ mobileOpen, setMobileOpen ] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const items = navItems(handleLogout)

  return (
    <>
    <MUIAppBar component="nav" sx={S.appBar}>
      <Toolbar>
        <IconButton className="menu-icon" onClick={handleDrawerToggle}>
          <Menu />
        </IconButton>
        <Title color="dark" variant="h6" />
        <NavList items={items} type="desktop" />
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
          <NavList items={items} type="mobile" />
        </Box>
      </Drawer>
    </Box>
    <Toolbar />
    </>
  )
}
