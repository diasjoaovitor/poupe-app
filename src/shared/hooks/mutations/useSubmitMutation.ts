import { useMutation } from "react-query"
import { v4 as uuid } from 'uuid'
import { create, createDocs, createYear, createYears, getRecurringTransactions, update, updateDocs } from "../../firebase"
import { addRecorrency, getDistinctYears } from "../../functions"
import { TRecorrency, TTransaction } from "../../types"

export const useSubmitMutation = (pathname: string, ref: string, dateContext: string) => {
  type FnArgs = {
    transaction: TTransaction, recorrency: TRecorrency
  }
  const fn = async (args: FnArgs) => {
    const { transaction, recorrency } = args

    const year  = new Date(transaction.date).getFullYear()

    if (pathname === '/submit/create') {
      if (!recorrency.frequency) {
        await create(transaction)
        await createYear({ ref, year })
        return
      } 
        
      const transactions = addRecorrency(transaction, recorrency, uuid())
      await createDocs(transactions)
      const years = getDistinctYears(transactions.map(({ date }) => new Date(date).getFullYear()))
      await createYears({ years, ref })
      return
    }

    await update(transaction)
    transaction.date !== dateContext && await createYear({ ref, year })
  }

  const mutation = useMutation(fn)

  return mutation
}