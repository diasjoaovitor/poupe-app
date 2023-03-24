import { useMutation } from 'react-query'
import { TRecurrence, TTransaction } from '../../shared/types'
import { createTransaction, createTransactions, updateTransaction, updateTransactionAndAddRecurrence, updateTransactions } from './mutation-fn'

type Args = {
  transaction: TTransaction 
  recurrence: TRecurrence 
  pathname: string 
}

export const useSubmitMutation = () => {
  const mutation = (pathname: string, isRecurring: boolean, hasRecurrenceRef: boolean) => {
      if (pathname === '/submit/create') {
        return !isRecurring ? createTransaction : createTransactions
      }
      if (!hasRecurrenceRef && isRecurring) return updateTransactionAndAddRecurrence
      return !isRecurring ? updateTransaction : updateTransactions
  }
  const { isLoading, isSuccess, data: fnName, error, mutateAsync } = useMutation({
    mutationFn: async (args: Args) => {
      const { transaction, recurrence, pathname } = args
      const isRecurring = recurrence.take > 1
      const hasRecurrenceRef = Boolean(transaction.recurrenceRef)
      const fn = mutation(pathname, isRecurring, hasRecurrenceRef)
      await fn(transaction, recurrence)
      return fn.name
    }
  })
  return { isLoading, isSuccess, fnName, error, mutateAsync }
}
