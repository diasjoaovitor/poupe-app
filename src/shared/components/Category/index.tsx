import { useState } from 'react'
import { Box, FormControl, Radio, RadioGroup, Typography } from '@mui/material'
import { SvgIconComponent } from '@mui/icons-material'
import { TMUIColor } from '../../types'
import * as S from './style'

type Props = {
  category: string
  categories: {
    name: string
    icon: SvgIconComponent
  }[]
  color: {
    hex: string
    mui: TMUIColor
  }
}

export const Category: React.FC<Props> = ({ 
  category: c, categories, color
}) => {
  const [ category, setCategory ] = useState(c)

  if (!categories.find(({ name }) => name === category)) setCategory('Outros')

  return (
    <FormControl sx={S.category} fullWidth>
      <Typography component="label">Categoria</Typography>
      <RadioGroup value={category}>
        {categories.map(({ name, icon: Icon }, index) => (
          <Box 
            key={index} component="label"
            sx={{ color: name !== category ? 'inherit' : color.hex }}
          >
            <Radio 
              value={name} name="category" color={color.mui}
              onChange={e => setCategory(e.target.value)}
              sx={{ display: 'none' }} 
            />
            <Icon />
            <Typography variant="caption">{name}</Typography>
          </Box>
        ))}
      </RadioGroup>
    </FormControl>
  )
}