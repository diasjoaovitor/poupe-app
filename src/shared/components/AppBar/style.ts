import { SxProps, Theme } from '@mui/material'

export const AppBar: SxProps<Theme> = {
  position: 'static',
  height: {
    md: '100vh'
  },
  width: {
    md: 260
  },
  '& .icon-button': {
    display: {
      md: 'none'
    }
  }
}

export const Nav: SxProps<Theme> = {
  py: 2,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: 2,
  '& > div': {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    '& hr': {
      mb: 2
    }
  },
  '& a': {
    color: 'inherit',
    textDecoration: 'none',
    display: 'flex',
    gap: 1,
    px: 3
  }
}
