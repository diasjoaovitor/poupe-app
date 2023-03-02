import { useMutation } from "react-query"
import { v4 as uuid } from 'uuid'
import { create, createDocs, createYear, createYears, update } from "../../firebase"
import { addRecurrence, getDistinctYears } from "../../functions"
import { TRecurrence, TTransaction } from "../../types"

export const useSubmitMutation = (pathname: string, ref: string, dateContext: string) => {
  type FnArgs = {
    transaction: TTransaction, recurrence: TRecurrence
  }
  const fn = async (args: FnArgs) => {
    const { transaction, recurrence } = args

    const year  = new Date(transaction.date).getFullYear()

    if (pathname === '/submit/create') {
      if (!recurrence.frequency) {
        await create(transaction)
        await createYear({ ref, year })
        return
      } 
        
      const transactions = addRecurrence(transaction, recurrence, uuid())
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