import { FormEvent, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { SelectChangeEvent } from "@mui/material"
import { useAppContext, useAuthContext, useThemeContext } from "../contexts"
import { transaction } from "../states"
import { expenseCategories, incomeCategories } from "../states/categories"
import { TMUIColor, TRecurrence, TTransaction, TTransactionType } from "../types"
import { getElementValues, getErrorMessage, getPeriod } from "../functions"
import { useSubmitMutation } from "./mutations"

export const useSubmit = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { user } = useAuthContext()
  const { theme } = useThemeContext()
  const { appContext, clearContext } = useAppContext()
  const { transaction: tContext } = appContext

  const [ type, setType ] = useState<TTransactionType>(tContext?.type || transaction.type)
  const [ loader, setLoader ] = useState(false)
  const [ message, setMessage ] = useState('')

  const ref = user?.uid as string

  const mutation = useSubmitMutation(pathname, ref, appContext.transaction?.date as string)

  const state = {
    ...type === 'Despesa' ? {
      color: {
        hex: theme.palette.error.main,
        mui: 'error' as TMUIColor
      },
      categories: expenseCategories
    } : {
      color: {
        hex: theme.palette.primary.main,
        mui: 'primary' as TMUIColor
      },
      categories: incomeCategories
    },
    transaction: tContext || transaction,
    title: (pathname === '/submit/create' ? 'Adicionar' : 'Editar') + ' Transação'
  }

  const handleTypeChange = (e: SelectChangeEvent) => {
    const type = e.target.value as TTransactionType
    setType(type)
  }

  const handleClose = () => {
    setMessage('')
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      setLoader(true)
      const [ category, description, value, date, take, frequency ] = getElementValues(e, ['category', 'description', 'value', 'date', 'take', 'frequency'])
      const transaction: TTransaction = {
        ...state.transaction,
        type,
        category, description, value: Number(value), date,
        period: getPeriod(date),
        ref,
        timestamp: (new Date()).toLocaleString("en", { dateStyle: "medium", timeStyle: "medium" }),
      }
      await mutation.mutateAsync({ transaction, recurrence: { take: Number(take), frequency } as TRecurrence })
      clearContext()
      navigate('/')
    } catch (error) {
      setLoader(false)
      const message = getErrorMessage('generic')
      setMessage(message)
      console.error(error)
    }
  }

  return { 
    state, handleSubmit, 
    type, handleTypeChange, 
    loader, message, handleClose
  }
}
