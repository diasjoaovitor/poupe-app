import { useState } from 'react'
import { useMutation } from 'react-query'
import { getErrorMessage, getSuccessMessage } from '../../shared/functions'
import { TRecurrence, TTransaction } from '../../shared/types'
import {
  createTransaction,
  createTransactions,
  updateTransaction,
  updateTransactionAndAddRecurrence,
  updateTransactions
} from './mutation-fn'

type Args = {
  transaction: TTransaction
  recurrence: TRecurrence
  pathname: string
}

export const useSubmitMutation = () => {
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const mutation = (
    pathname: string,
    isRecurring: boolean,
    hasRecurrenceRef: boolean
  ) => {
    if (pathname === '/submit/create') {
      return !isRecurring ? createTransaction : createTransactions
    }
    if (!hasRecurrenceRef && isRecurring)
      return updateTransactionAndAddRecurrence
    return !isRecurring ? updateTransaction : updateTransactions
  }
  const { isLoading, mutateAsync } = useMutation({
    mutationFn: async (args: Args) => {
      const { transaction, recurrence, pathname } = args
      const isRecurring = recurrence.take > 1
      const hasRecurrenceRef = Boolean(transaction.recurrenceRef)
      const fn = mutation(pathname, isRecurring, hasRecurrenceRef)
      await fn(transaction, recurrence)
      return fn.name
    },
    onError: (error) => {
      setErrorMessage(getErrorMessage('gereric'))
      console.error(error)
    },
    onSuccess: (fnName) => setSuccessMessage(getSuccessMessage(fnName))
  })
  return { isLoading, successMessage, errorMessage, mutateAsync }
}
