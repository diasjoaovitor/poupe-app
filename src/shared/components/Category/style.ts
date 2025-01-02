import { SxProps, Theme } from '@mui/material'

export const category: SxProps<Theme> = {
  padding: 2,
  '& .MuiFormGroup-root': {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    marginTop: 1,
    gap: 1,
    '& label': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: '1px solid',
      padding: 0.5,
      borderRadius: 1,
      cursor: 'pointer'
    }
  }
}
