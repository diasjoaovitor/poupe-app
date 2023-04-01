import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { TMUIColor, TRecurrence } from '../../types'
import * as S from './style'

const notRepeat = 'Não Repetir'

export const recurrenceOptions = [
  {
    name: notRepeat,
    value: notRepeat
  },
  {
    name: 'Semanal',
    value: 'WEEKLY'
  },
  {
    name: 'Mensal',
    value: 'MONTHLY'
  },
  {
    name: 'Anual',
    value: 'YEARLY'
  }
]

type Props = {
  recurrence: TRecurrence | undefined
  color: TMUIColor
}

const getMin = (frequency: string) => frequency === notRepeat ? 1 : 2

export const Recurrence: React.FC<Props> = ({ recurrence, color }) => {
  const [ open, setOpen ] = useState(Boolean(recurrence))
  const [ frequency, setFrequency ] = useState(recurrence?.frequency || notRepeat)
  const [ quantity, setQuantity ] = useState(recurrence?.take || 1)
  
  const min = getMin(frequency)

  const handleClick = () => setOpen(!open)

  const handleFrequencyChange = (e: SelectChangeEvent) => {
    const frequency = e.target.value
    setFrequency(frequency)
    setQuantity(getMin(frequency))
  }

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.currentTarget.value))
  }

  return (
    <>
    <Button
      color={color} fullWidth
      onClick={handleClick}
      startIcon={<ExpandMore />}
      sx={{ display: !open ? 'flex' : 'none', my: 1 }}
    >
      Mais Detalhes
    </Button>
    <FormControl sx={{ ...S.Recurrence, display: !open ? 'none' : 'flex' }} fullWidth>
      <Typography component="label">Repetir</Typography>
      <Stack direction="row" gap={1} p={2}>
        <TextField
          name="take" label="Quantidade" type="number" inputMode="numeric"
          value={quantity > 0 ? quantity : ''}
          inputProps={{ step: '1', min, max: '12' }}
          fullWidth
          disabled={frequency === notRepeat}
          onChange={handleQuantityChange}
          required
          color={color}
        />
        <FormControl fullWidth>
          <InputLabel id="frequency" color={color}>Frequência *</InputLabel>
          <Select
            labelId="frequency"
            id="frequency"
            label="Frequência"
            name="frequency"
            value={frequency}
            fullWidth
            onChange={handleFrequencyChange}
            required
            color={color}
          >
            {recurrenceOptions.map(({ name, value }) => (
              <MenuItem key={name} value={value}>{name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Button
        color={color}
        onClick={handleClick}
        startIcon={<ExpandLess />
        }>
        Recolher
      </Button>
    </FormControl>
    </>
  )
}
