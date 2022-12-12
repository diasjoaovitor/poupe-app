import { Backdrop, CircularProgress } from '@mui/material'

type Props = {
  open: boolean
}

export const Loader: React.FC<Props> = ({ open }) => {
  return (
    <Backdrop
      sx={{ 
        zIndex: theme => theme.zIndex.drawer + 1 
      }}
      open={open}
    >
      <CircularProgress />
    </Backdrop>
  )
}
