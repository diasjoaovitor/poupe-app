import { ReactNode } from 'react'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { AppBar, Loader, Notification } from '..'
import * as S from './style'
import { TMUIColor } from '../../types'

type Props = {
  page: string
  children: ReactNode
  isLoading: boolean
  notificationMessage: string
  color: string
  comeBackColor?: TMUIColor
}

export const Layout: React.FC<Props> = ({ page, children, isLoading, notificationMessage, color, comeBackColor }) => {
  const theme = useTheme()
  const md = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Box sx={S.Layout}>
      <AppBar page={page} md={md} comeBackColor={comeBackColor} />
      <Box component="main">
        {md && (
          <Typography component="h1" variant="h5" sx={{ '&::after': { backgroundColor: color } }}>
            {page}
          </Typography>
        )}
        {children}
      </Box>
      <Loader open={isLoading} />
			<Notification message={notificationMessage} />
    </Box>
  ) 
}
