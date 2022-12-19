import { SxProps, Theme } from '@mui/material'

export const navItemsMobile: SxProps<Theme> = {
  '& .MuiListItemIcon-root': {
    minWidth: 'auto',
    mr: 2
  },
  '& a': {
    color: '#fff'
  }
}

export const navItemsDesktop: SxProps<Theme> = {
  display: {
    xs: 'none', 
    sm: 'flex',
  },
  '& .MuiListItemIcon-root': {
    display: 'none'
  },
  '& a': {
    color: '#fff'
  }
}

export const appBar: SxProps<Theme> = {
  '& .menu-icon': {
    display: { 
      sm: 'none' 
    }
  }, 
  '& > div': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: {
      sm: 'space-between',
      xs: 'flex-start'
    },
    '& .Title .svg-container': {
      display: { 
        xs: 'none',
        sm: 'inherit'
      }
    }
  },
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
