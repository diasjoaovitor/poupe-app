import { TTransaction } from "./transaction"

export type TTransactionsProps = {
  transactions: TTransaction[]
  color: {
    blue: string
    red: string
  }
  handleClick(transaction: TTransaction): void
}
