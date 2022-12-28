import { SxProps, Theme } from '@mui/material'

export const wallet: SxProps<Theme> = {
  padding: 2,
  '& ul': {
    display: 'grid',
    gap: 1,
    gridTemplateColumns: {
      sm: '1fr 1fr 1fr'
    },
    '& li': {
      justifyContent: 'space-between',
      '& svg': {
        fontSize: '3.2em',
        position: 'relative',
        left: 8,
      }
    }
  }
}
