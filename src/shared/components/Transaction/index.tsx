import { ArrowBack } from '@mui/icons-material'
import { Box, DialogContent, Divider, Stack, Typography } from '@mui/material'
import { Button, Dialog, DialogActions, useMediaQuery, useTheme } from '@mui/material'
import { formatCurrency, formatDate, getCategoryIcon } from '../../functions'
import { TTransaction } from '../../types'
import * as S from './style'

type Props = {
  transaction: TTransaction | undefined
  handleClose(): void
  handleUpdate(): void
  handleDelete(): void
}

export const Transaction: React.FC<Props> = ({ transaction, handleClose, handleUpdate, handleDelete }) => {
  const open = Boolean(transaction)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))
  const color = transaction?.type === 'Despesa' ? 'error' : 'primary'
  const Icon = getCategoryIcon(transaction?.category as string)

  return (
    <Dialog 
      fullScreen={fullScreen} open={open} 
      onClose={handleClose} sx={S.transaction}
    >
      <DialogContent>
        <Stack component="header" sx={S.header}>
          <Typography component="h3" variant="h6">
            {transaction?.type}
          </Typography>
          <ArrowBack 
            onClick={handleClose} color={color} fontSize="large" 
          />
        </Stack>
        <Box sx={S.content}>
          <Stack sx={S.caption}>
            <Typography variant="caption" sx={S.flex}>
              <Icon fontSize='small' />
              {transaction?.category}
            </Typography>
            <Typography variant="caption">
              {formatDate(transaction?.date as string)}
            </Typography>
          </Stack>
          <Divider sx={{ my: .5 }} />
          <Stack sx={{ ...S.flex }}>
            <Typography component="p">
              {transaction?.description}
            </Typography>
            <Typography component="p">
              {formatCurrency(transaction?.value as number)}
            </Typography>
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="warning" onClick={handleUpdate}>
          Editar
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  )
}
