import { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContentText } from '@mui/material'

type Props = {
  message: string
}

export const Notification: React.FC<Props> = ({ message }) => {
  const [ open, setOpen ] = useState(Boolean(message))

  useEffect(() => {
    setOpen(Boolean(message))
  }, [ message ])

  const handleClose = () => setOpen(false)

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogContentText p={2}>
        {message}
      </DialogContentText>
      <DialogActions onClick={handleClose}>
        <Button>OK</Button>
      </DialogActions>
    </Dialog>
  )
}
