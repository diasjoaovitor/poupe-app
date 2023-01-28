import { SxProps, Theme } from '@mui/material'

export const submit: SxProps<Theme> = {
  overflowX: 'auto',
  '& form': {
    margin: 2,
    border: 1,
    '& button': {
      margin: 2,
    }
  }
}
