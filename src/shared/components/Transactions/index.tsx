import { Card, Divider, List, ListItem, Paper, Typography } from '@mui/material'
import { formatCurrency, formatPresentationOfTransactions, getCategoryIcon } from '../../functions'
import { TTransactionsProps } from '../../types'
import * as S from './style'

export const Transactions: React.FC<TTransactionsProps> = ({ transactions, handleClick, color }) => {
  if (transactions.length === 0) 
    return (
      <Paper component="section" sx={S.transactions}>
        Você não possui lançamentos esse mês
      </Paper>
    )

  const presentation = formatPresentationOfTransactions(transactions)

  const getBackgroundColor = (type: string) => (
    type === 'Despesa' ? color.red : color.blue
  )

  return (
    <Paper component="section" sx={S.transactions}>
      {presentation.map(transaction => (
        <Card key={transaction.date}>
          <Typography component="h2" variant="body2" color="ButtonHighlight">
            {transaction.date}
            {transaction.total < 0 ? ' - ' : ' + '}
            {formatCurrency(Math.abs(transaction.total))}
          </Typography>
          <List>
            {transaction.transactions.map((transaction, index) => {
              const { description, value, type, category } = transaction
              const Icon = getCategoryIcon(category)
              return (
                <ListItem 
                  key={index} 
                  sx={{ ...S.transaction, backgroundColor: getBackgroundColor(type)}}
                  onClick={() => handleClick(transaction)}
                >
                  <Typography>
                    <Icon />
                    {description}
                  </Typography>
                  <Typography variant="h6">{formatCurrency(value)}</Typography>
                </ListItem>
              )
            })}
          </List>
          <Divider />
        </Card>
      ))}
    </Paper>
  )
}
