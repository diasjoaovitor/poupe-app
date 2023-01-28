import { Link } from 'react-router-dom'
import { Stack, Typography } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { TMUIColor } from '../../types'
import * as S from './style'

type Props = {
  title: string
  color: TMUIColor
}

export const Header: React.FC<Props> = ({ title, color }) => {
  return (
    <Stack component="header" sx={S.header}>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      <Link to="/">
        <ArrowBack color={color} fontSize="large" />
      </Link>
    </Stack>
  )
}
