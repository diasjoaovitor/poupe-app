import { ChangeEvent } from 'react'
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material'
import { TTransactionType } from '../../types'
import * as S from './style'

type Props = {
  type: TTransactionType
  handleTypeChange(e: ChangeEvent<HTMLInputElement>): void
}

export const Type: React.FC<Props> = ({ type, handleTypeChange }) => {
  return (
    <FormControl sx={S.transactionType}>
      <Typography component="label">Tipo de lançamento</Typography>
      <RadioGroup value={type}>
        <FormControlLabel
          label="Despesa"
          value="Despesa"
          name="type"
          control={<Radio color="error" onChange={handleTypeChange} />}
        />
        <FormControlLabel
          label="Receita"
          value="Receita"
          name="type"
          control={<Radio onChange={handleTypeChange} />}
        />
      </RadioGroup>
    </FormControl>
  )
}
