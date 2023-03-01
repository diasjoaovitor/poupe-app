import { SxProps, Theme } from '@mui/material'

export const Auth: SxProps<Theme> = {
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  '& .Title': {
    mb: 2
  }
}

export const Form: SxProps<Theme> = {
  padding: 3,
  marginBottom: 1,
  textAlign: 'left',
  '& h1': {
    marginBottom: 1
  },
  '& .MuiInputBase-root': {
    marginBottom: 1
  }
}

export const Link: SxProps<Theme> = {
  color: '#e3f2fd',
  cursor: 'pointer'
}
