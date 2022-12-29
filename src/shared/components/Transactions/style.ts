import { SxProps, Theme } from '@mui/material'

export const transactions: SxProps<Theme> = {
  padding: 2, 
  '& h2': {
    textAlign: 'center'
  }, 
  '& hr': {
    marginBottom: 1
  }
}

export const transaction: SxProps<Theme> = {
  marginBottom: 1,
  justifyContent: 'space-between',
  cursor: 'pointer',
  '& p': {
    display: 'flex', 
    alignItems: 'center',
    '& svg': {
      marginRight: 1,
      border: 'solid 1px',
      padding: .2,
      borderRadius: 1
    }
  }
}
