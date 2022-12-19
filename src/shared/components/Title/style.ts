import { SxProps, Theme } from "@mui/material";

export const title: SxProps<Theme> =  {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

export const icon: SxProps<Theme> = {
  borderRadius: 1,
  display: 'flex',
  alignItems: 'center',
  marginRight: 1,
  '& svg': {
    position: 'relative',
    left: 1
  }
}
