import { SxProps, Theme } from '@mui/material'

export const auth: SxProps<Theme> = {
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  '& header': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
    '& .svg-container': {
      borderRadius: 1,
      display: 'flex',
      alignItems: 'center',
      marginRight: 1,
      '& svg': {
        position: 'relative',
        left: 1
      }
    },
  },
  '& form': {
    padding: 3,
    marginBottom: 1,
    textAlign: 'left',
    '& h2': {
      marginBottom: 1
    },
    '& .MuiInputBase-root': {
      marginBottom: 1
    }
  },
  '& a': {
    color: 'inherit',
    textAlign: 'center'
  }
}
