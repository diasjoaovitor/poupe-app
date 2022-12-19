import { SxProps, Theme } from '@mui/material'

export const auth: SxProps<Theme> = {
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  '& .Title': {
    mb: 2
  },
  '& a': {
    color: 'inherit',
    textAlign: 'center'
  }
}

export const form: SxProps<Theme> = {
  padding: 3,
  marginBottom: 1,
  textAlign: 'left',
  '& h2': {
    marginBottom: 1
  },
  '& .MuiInputBase-root': {
    marginBottom: 1
  }
}
