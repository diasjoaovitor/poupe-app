import { CSSObject, SxProps, Theme } from '@mui/material'

export const Title: CSSObject = {
  content: '""',
  width: 60,
  height: 8,
  display: 'block'
}

export const FlexBetween: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 1
} 
