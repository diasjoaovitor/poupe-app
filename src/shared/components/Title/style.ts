import { SxProps, Theme } from '@mui/material'

export const Title: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

export const Icon: SxProps<Theme> = {
  borderRadius: 1,
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#42a5f5',
  marginRight: 1,
  '& svg': {
    position: 'relative',
    left: 1
  }
}
