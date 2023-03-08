import { SxProps, Theme } from '@mui/material'
import * as S from '../../styles'

export const Transaction: SxProps<Theme> = {
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

export const Header: SxProps<Theme> = {
  ...S.FlexBetween,
  mb: 2
}

export const Content: SxProps<Theme> = {
  padding: 1,
  borderRadius: 1,
  border: 'solid .5px rgba(255, 255, 255, 0.12)'
}


export const Caption: SxProps<Theme> = {
  ...S.FlexBetween,
  '& svg': {
    mr: .5,
    position: 'relative',
    bottom: '.1em',
    border: 'solid 1px',
    padding: .2,
    borderRadius: 1
  }
}
