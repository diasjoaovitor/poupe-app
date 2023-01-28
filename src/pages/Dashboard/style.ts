import { SxProps, Theme } from "@mui/material"

export const dashboard: SxProps<Theme> = {
  padding: 2,
  overflowX: 'auto',
  '& .Wallet': {
    my: 2
  },
  '& > a': {
    color: 'inherit',
    position: 'fixed',
    bottom: 2,
    right: 20
  }
}
