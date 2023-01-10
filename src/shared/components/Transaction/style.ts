import { SxProps, Theme } from '@mui/material'

export const transaction: SxProps<Theme> = {
  '& .MuiPaper-root': {
    minWidth: '280px'
  },
  '& .MuiDialogContent-root': {
    paddingBottom: 0
  },
  '& .MuiDialogActions-root': {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    margin: 2
  }
}

export const flex: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
} 

export const header: SxProps<Theme> = {
  ...flex,
  mb: 2,
  '& svg': {
    cursor: 'pointer'
  }
}

export const content: SxProps<Theme> = {
  padding: 1,
  borderRadius: 1,
  border: 'solid .5px rgba(255, 255, 255, 0.12)'
}


export const caption: SxProps<Theme> = {
  ...flex,
  '& svg': {
    mr: .5,
    position: 'relative',
    bottom: '.1em',
    border: 'solid 1px',
    padding: .2,
    borderRadius: 1
  }
}
