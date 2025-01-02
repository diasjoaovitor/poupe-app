import { forwardRef, useEffect, useState } from 'react'
import {
  AlertProps,
  Alert as MuiAlert,
  Snackbar as MuiSnackbar
} from '@mui/material'

type Props = {
  message: string | undefined
}

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
))

export const Snackbar: React.FC<Props> = ({ message }) => {
  const [open, setOpen] = useState(Boolean(message))

  useEffect(() => {
    setOpen(Boolean(message))
  }, [message])

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={4000}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </MuiSnackbar>
  )
}
