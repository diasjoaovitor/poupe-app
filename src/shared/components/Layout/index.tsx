import { ReactNode } from 'react'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { AppBar, Loader, Notification } from '..'
import { TMUIColor } from '../../types'
import * as S from './style'

type Props = {
  page: string
  children: ReactNode
  isLoading: boolean
  notificationMessage: string
  color: {
    title: string
    mui: TMUIColor
  }
}

export const Layout: React.FC<Props> = ({ page, children, isLoading, notificationMessage, color }) => {
  const theme = useTheme()
  const md = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Box sx={S.Layout}>
      <AppBar page={page} md={md} color={color.mui} />
      <Box component="main">
        {md && (
          <Typography component="h1" variant="h5" sx={{ '&::after': { backgroundColor: color.title } }}>
            {page}
          </Typography>
        )}
        {children}
      </Box>
      <Loader open={isLoading} color={color.mui} />
			<Notification message={notificationMessage} />
    </Box>
  ) 
}
