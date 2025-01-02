import { Backdrop, CircularProgress } from '@mui/material'
import { TMUIColor } from '../../types'

type Props = {
  open: boolean
  color?: TMUIColor
}

export const Loader: React.FC<Props> = ({ open, color }) => {
  return (
    <Backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
      open={open}
    >
      <CircularProgress color={color} />
    </Backdrop>
  )
}
