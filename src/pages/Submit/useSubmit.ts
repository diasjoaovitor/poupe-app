import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { SelectChangeEvent } from '@mui/material'
import {
  useAppContext,
  useAuthContext,
  useThemeContext
} from '../../shared/contexts'
import { transaction } from '../../shared/states'
import {
  expenseCategories,
  incomeCategories
} from '../../shared/states/categories'
import {
  TMUIColor,
  TRecurrence,
  TTransaction,
  TTransactionType
} from '../../shared/types'
import {
  getElementValues,
  getErrorMessage,
  getPeriod,
  getSuccessMessage
} from '../../shared/functions'
import { useSubmitMutation } from './useSubmitMutation'

export const useSubmit = () => {
  const { pathname } = useLocation()
  const { user } = useAuthContext()
  const { theme } = useThemeContext()
  const { appContext, clearContext } = useAppContext()
  const { transaction: tContext } = appContext

  const getState = (type: string) => ({
    ...(type === 'Despesa'
      ? {
          color: {
            hex: theme.palette.error.main,
            mui: 'error' as TMUIColor
          },
          categories: expenseCategories
        }
      : {
          color: {
            hex: theme.palette.primary.main,
            mui: 'primary' as TMUIColor
          },
          categories: incomeCategories
        }),
    transaction: tContext || transaction,
    title:
      (pathname === '/submit/create' ? 'Adicionar' : 'Editar') + ' Transação'
  })

  const [type, setType] = useState<TTransactionType>(
    tContext?.type || transaction.type
  )
  const [state, setState] = useState(getState(type))
  const [recurrence, setRecurrence] = useState<TRecurrence>()

  const ref = user?.uid as string

  const { isLoading, successMessage, errorMessage, mutateAsync } =
    useSubmitMutation()

  useEffect(() => {
    if (successMessage) {
      clearContext()
      setState((state) =>
        pathname === '/submit/create'
          ? getState(type)
          : { ...state, transaction: { ...state.transaction, recurrence } }
      )
    }
  }, [isLoading])

  const handleTypeChange = (e: SelectChangeEvent) => {
    const type = e.target.value as TTransactionType
    setType(type)
    setState({
      ...getState(type),
      transaction: state.transaction
    })
  }

  const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      transaction: {
        ...state.transaction,
        [e.currentTarget.name]: e.currentTarget.value
      }
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const values = getElementValues(e, [
      'category',
      'description',
      'value',
      'date',
      'take',
      'frequency'
    ])
    const [category, description, value, date, take, frequency] = values
    const transaction: TTransaction = {
      ...state.transaction,
      type,
      category,
      description,
      value: Number(value),
      date,
      period: getPeriod(date),
      ref,
      timestamp: new Date().toLocaleString('en', {
        dateStyle: 'medium',
        timeStyle: 'medium'
      })
    }
    const recurrence = { take: Number(take), frequency } as TRecurrence
    setRecurrence(recurrence)
    await mutateAsync({ transaction, recurrence, pathname })
  }

  return {
    state,
    handleSubmit,
    type,
    handleTypeChange,
    handleTextFieldChange,
    isLoading,
    errorMessage,
    successMessage
  }
}
