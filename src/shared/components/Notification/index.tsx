import { Button, Dialog, DialogActions, DialogContentText, useMediaQuery, useTheme } from '@mui/material'
import * as S from './style'

type Props = {
  message: string
  handleClose(): void
}

export const Notification: React.FC<Props> = ({ message, handleClose }) => {
  const open = Boolean(message)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
    >
      <DialogContentText sx={S.style}>
        {message}
      </DialogContentText>
      <DialogActions onClick={handleClose}>
        <Button>OK</Button>
      </DialogActions>
    </Dialog>
  )
}
