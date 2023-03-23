import { SxProps, Theme } from '@mui/material'
import * as S from '../../styles'

export const Layout: SxProps<Theme> = {
  overflow: 'auto',
  display: {
    md: 'flex'
  },
  '& main': {
    flex: 1,
    p: 2,
    overflow: 'auto',
    '& h1': {
      mb: 3,
      '&::after': {
        ...S.Title
      }
    },
    '& > a': {
      color: 'inherit',
      position: 'fixed',
      bottom: 2,
      right: 20
    }
  }
}
