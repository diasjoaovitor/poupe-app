import { Box, List, ListItem, Paper, Typography } from '@mui/material'
import { AttachMoney, ArrowUpward, ArrowDownward } from '@mui/icons-material'
import { useThemeContext } from '../../contexts'
import { formatCurrency } from '../../functions'
import * as S from './style'

type Props = {
  balance: number
  incomes: number
  expenses: number
}

export const Wallet: React.FC<Props> = ({ balance, incomes, expenses }) => {
  const { theme } = useThemeContext()

  const listItems = [
    {
      caption: 'Saldo',
      value: balance,
      icon: AttachMoney,
      backgroundColor: theme.palette.success.dark
    },
    {
      caption: 'Receitas',
      value: incomes,
      icon: ArrowUpward,
      backgroundColor: theme.palette.primary.dark
    },
    {
      caption: 'Despesas',
      value: expenses,
      icon: ArrowDownward,
      backgroundColor: theme.palette.error.dark
    }
  ]

  return (
    <Paper className="Wallet" component="section" sx={S.wallet}>
      <List>
        {listItems.map(({ backgroundColor, caption, value, icon: Icon }) => (
          <ListItem sx={{ backgroundColor }} key={caption}>
            <Box>
              <Typography component="h2" variant="caption">
                {caption}
              </Typography>
              <Typography component="p" variant="h5">
                {formatCurrency(value)}
              </Typography>
            </Box>
            <Icon />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}
