import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Button, FormControl, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { TMUIColor, TRecorrency } from '../../types'
import * as S from './style'

const notRepeat = 'Não Repetir'
export const recorrencyOptions = [
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
  recorrency: TRecorrency | undefined
  color: TMUIColor
}

export const Recorrency: React.FC<Props> = ({ recorrency, color }) => {
  const [ details, setDetails ] = useState(Boolean(recorrency))
  const [ frequency, setFrequency ] = useState(recorrency?.frequency || notRepeat)
  const [ quantity, setQuantity ] = useState(recorrency?.take || 1)

  const handleClick = () => setDetails(!details)

  const handleFrequencyChange = (e: SelectChangeEvent) => {
    const value = e.target.value
    setFrequency(value)
    value === notRepeat && setQuantity(1)
  }

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.currentTarget.value))
  }

  return (
    <>
    {!details ? (
      <Button 
        color={color} fullWidth
        onClick={handleClick}
        startIcon={<ExpandMore />}
      >
        Mais Detalhes
      </Button>
    ) : (
      <FormControl sx={S.recorrency} fullWidth>
        <Typography component="label">Repetir</Typography>
        <Stack direction="row" gap={1} p={2}>
          <TextField 
            name="take" label="Quantidate" type="number" inputMode="numeric"
            value={quantity} 
            inputProps={{ step: '1', min: '0', max: '12' }}
            fullWidth
            disabled={frequency === notRepeat}
            onChange={handleQuantityChange}
          />
          <Select
            defaultValue={frequency}
            name="frequency"
            fullWidth
            onChange={handleFrequencyChange}
          >
            {recorrencyOptions.map(({ name, value}) => (
              <MenuItem key={name} value={value}>{name}</MenuItem>
            ))}
          </Select>
        </Stack>
        <Button 
          color={color}
          onClick={handleClick}
          startIcon={<ExpandLess />
        }>
          Recolher
        </Button>
      </FormControl>
    )}
  </>
  )
}
