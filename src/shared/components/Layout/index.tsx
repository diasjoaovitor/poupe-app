import { ReactNode } from 'react'
import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { AppBar, ComeBack, Loader, Notification, Snackbar } from '..'
import { TMUIColor } from '../../types'
import * as GS from '../../styles'
import * as S from './style'

type Props = {
  page: string
  children: ReactNode
  isLoading: boolean
  notificationMessage: string
  successMessage: string
  color: {
    title: string
    mui: TMUIColor
  }
}

export const Layout: React.FC<Props> = ({ 
  page, children, isLoading, notificationMessage, successMessage, color 
}) => {
  const theme = useTheme()
  const md = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Box sx={S.Layout}>
      <AppBar page={page} md={md} color={color.mui} />
      <Box component="main">
        {md && (
          <Stack sx={GS.FlexBetween}>
            <Typography component="h1" variant="h5" sx={{ '&::after': { backgroundColor: color.title } }}>
              {page}
            </Typography>
            <ComeBack color={color.mui} />
          </Stack>
        )}
        {children}
      </Box>
      <Loader open={isLoading} color={color.mui} />
			<Notification message={notificationMessage} />
      <Snackbar message={successMessage} />
    </Box>
  ) 
}
