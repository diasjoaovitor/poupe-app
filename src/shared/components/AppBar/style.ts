import { SxProps, Theme } from '@mui/material'

export const navItemsMobile: SxProps<Theme> = {
  '& .MuiListItemIcon-root': {
    minWidth: 'auto',
    mr: 2
  }
}

export const navItemsDesktop: SxProps<Theme> = {
  display: {
    xs: 'none', 
    sm: 'block'
  },
  '& .MuiListItemIcon-root': {
    display: 'none'
  }
}

export const appBar: SxProps<Theme> = {
  '& h1': {
    flexGrow: 1
  },
  '& .menu-icon': {
    display: { 
      sm: 
      'none' 
    }
  }
}

export const drawer: SxProps<Theme> = {
  display: { 
    xs: 'block', 
    sm: 'none' 
  },
  '& .MuiDrawer-paper': { 
    boxSizing: 'border-box', 
    width: 240 
  },
  '& > div': {
    textAlign: 'center',
    '& h1': {
      my: 2
    }
  }
}
