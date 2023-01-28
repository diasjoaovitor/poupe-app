import { useState } from 'react'
import { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { FormControl, TextField } from '@mui/material'
import { TMUIColor } from '../../types'
import * as S from './style'

type Props = {
  transaction: {
    description: string
    value: number
    date: string
  }
  color: TMUIColor
}

export const FormTextField: React.FC<Props> = ({ transaction, color }) => {
  const [ date, setDate ] = useState(transaction.date)

  const handleDateChange = (e: Dayjs | null) => {
    if (e === null) return

    const date = e.format('YYYY/MM/DD')
    setDate(date)
  }

  return (
    <FormControl sx={S.formTextField} fullWidth>
      <TextField 
        name="description" label="Descrição"
        defaultValue={transaction.description}
        color={color} required
      >
        Descrição
      </TextField>
      <TextField 
        name="value" label="Valor" type="number" inputMode="numeric"
        defaultValue={transaction.value === 0 ? '' : transaction.value} 
        inputProps={{ step: 'any', min: '0' }}
        color={color} required
      >
        Valor
      </TextField>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="Data"
          inputFormat="DD/MM/YYYY"
          value={date}
          onChange={handleDateChange}
          renderInput={
            params => <TextField {...params} color={color} required/>
          }
        />
      </LocalizationProvider>
      <TextField name="date" value={date} type="hidden" sx={{ display: 'none' }}/>
    </FormControl>
  )
}