import { ArrowBack } from '@mui/icons-material'
import { Box, DialogContent, Divider, Stack, Typography } from '@mui/material'
import { Button, Dialog, DialogActions, useMediaQuery, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { formatCurrency, formatDate, getCategoryIcon } from '../../functions'
import { TTransaction } from '../../types'
import { recurrenceOptions } from '../Recurrence'
import * as S from './style'

type Props = {
  transaction: TTransaction | undefined
  handleUpdate(): void
  handleDelete(): void
}

export const Transaction: React.FC<Props> = ({ transaction, handleUpdate, handleDelete }) => {
  const [ open, setOpen ] = useState(Boolean(transaction))

  useEffect(() => {
    setOpen(Boolean(transaction))
  }, [ transaction ])

  const handleClose = () => setOpen(false)

  if (!transaction) return <></>

  const { description, value, type, category, date, installment, recurrence } = transaction
  const color = type === 'Despesa' ? 'error' : 'primary'
  const Icon = getCategoryIcon(category as string)
  const frequency = recurrenceOptions.find(({ value }) => value === recurrence?.frequency)

  return (
    <Dialog 
      open={open} onClose={handleClose} sx={S.transaction}
    >
      <DialogContent>
        <Stack component="header" sx={S.header}>
          <Typography component="h3" variant="h6">
            {type}
          </Typography>
          <ArrowBack 
            onClick={handleClose} color={color} fontSize="large" 
          />
        </Stack>
        <Box sx={S.content}>
          <Stack sx={S.caption}>
            <Typography variant="caption" sx={S.flex}>
              <Icon fontSize='small' />
              {category}
            </Typography>
            <Typography variant="caption">
              {formatDate(date as string)}
            </Typography>
          </Stack>
          <Divider sx={{ my: .5 }} />
          <Stack sx={{ ...S.flex }}>
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
