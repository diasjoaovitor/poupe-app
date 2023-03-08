import { ArrowBack } from '@mui/icons-material'
import { Box, DialogContent, Divider, IconButton, Stack, Typography } from '@mui/material'
import { Button, Dialog, DialogActions } from '@mui/material'
import { useEffect, useState } from 'react'
import { formatCurrency, formatDate, getCategoryIcon } from '../../functions'
import { TMUIColor, TTransaction } from '../../types'
import { recurrenceOptions } from '../Recurrence'
import * as GS from '../../styles'
import * as S from './style'

export type Props = {
  transaction: TTransaction | undefined
  color: TMUIColor
  handleUpdate(): void
  handleDelete(): void
}

export const Transaction: React.FC<Props> = ({ transaction, color, handleUpdate, handleDelete }) => {
  const [ open, setOpen ] = useState(Boolean(transaction))

  useEffect(() => {
    setOpen(Boolean(transaction))
  }, [ transaction ])

  const handleClose = () => setOpen(false)

  if (!transaction) return <></>

  const { description, value, type, category, date, installment, recurrence } = transaction
  const Icon = getCategoryIcon(category as string)
  const frequency = recurrenceOptions.find(({ value }) => value === recurrence?.frequency)

  return (
    <Dialog 
      open={open} onClose={handleClose} sx={S.Transaction} data-testid="transaction"
    >
      <DialogContent>
        <Stack component="header" sx={S.Header}>
          <Typography component="h3" variant="h6">
            {type}
          </Typography>
          <IconButton onClick={handleClose}>
            <ArrowBack color={color} fontSize="large" 
            />
          </IconButton>
        </Stack>
        <Box sx={S.Content}>
          <Stack sx={S.Caption}>
            <Typography variant="caption" sx={GS.FlexBetween}>
              <Icon fontSize='small' />
              {category}
            </Typography>
            <Typography variant="caption">
              {formatDate(date as string)}
            </Typography>
          </Stack>
          <Divider sx={{ my: .5 }} />
          <Stack sx={GS.FlexBetween}>
            <Typography component="p">
              {description} {installment && `- ${installment}`}
            </Typography>
            <Typography component="p">
              {formatCurrency(value as number)}
            </Typography>
          </Stack>
          {installment && (
            <>
            <Divider sx={{ my: .5 }} />
            <Typography component="p">
              Frequência: {frequency?.name}
            </Typography>
            </>
          )}
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
