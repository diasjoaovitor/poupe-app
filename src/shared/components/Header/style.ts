import { SxProps, Theme } from '@mui/material'

export const header: SxProps<Theme> = {
  padding: 2,
  flexDirection: 'row',
  justifyContent: 'space-between',
  '& > div': {
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      marginRight: 1
    }
  } ,
  '& a': {
    color: 'inherit', 
    marginLeft: 2,
    position: 'relative',
    top: 5 
  }
}
