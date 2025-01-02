import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { AddCircle } from '@mui/icons-material'
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
  handleNewTransaction?: () => void
}

export const Layout: React.FC<Props> = ({
  page,
  children,
  isLoading,
  notificationMessage,
  successMessage,
  color,
  handleNewTransaction
}) => {
  const theme = useTheme()
  const md = useMediaQuery(theme.breakpoints.up('md'))
  const isDashboardPage = page === 'Dashboard'
  return (
    <Box sx={S.Layout}>
      <AppBar page={page} md={md} color={color.mui} />
      <Box component="main">
        {md && (
          <Stack sx={GS.FlexBetween}>
            <Typography
              component="h1"
              variant="h5"
              sx={{ '&::after': { backgroundColor: color.title } }}
            >
              {page}
            </Typography>
            {!isDashboardPage && <ComeBack color={color.mui} />}
          </Stack>
        )}
        {children}
        {isDashboardPage && !md && (
          <Link to="/submit/create" onClick={handleNewTransaction}>
            <AddCircle fontSize="large" />
          </Link>
        )}
      </Box>
      <Loader open={isLoading} color={color.mui} />
      <Notification message={notificationMessage} />
      <Snackbar message={successMessage} />
    </Box>
  )
}
