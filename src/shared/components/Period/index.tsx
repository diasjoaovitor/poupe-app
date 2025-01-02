import { MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material'
import { months } from '../../states'
import * as S from './style'

type Props = {
  month: string
  year: string | number
  years: (string | number)[]
  handleChange(e: SelectChangeEvent): void
}

export const Period: React.FC<Props> = ({
  month,
  year,
  years,
  handleChange
}) => {
  return (
    <Stack className="Period" component="section" direction="row" sx={S.period}>
      <Select name="month" value={month} onChange={handleChange}>
        {months.map((month) => (
          <MenuItem key={month} value={month}>
            {month}
          </MenuItem>
        ))}
      </Select>
      <Select name="year" value={String(year)} onChange={handleChange}>
        {years.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  )
}
