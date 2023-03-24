import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SelectChangeEvent } from '@mui/material'
import { useAppContext } from '../../shared/contexts'
import { getDistinctYears, getErrorMessage, getSuccessMessage, getWallet } from '../../shared/functions'
import { TMUIColor, TTransaction } from '../../shared/types'
import { useDashboardQuery } from './useDashboardQuery'

export const useDashboard = () => {
  const navigate = useNavigate()

	const { appContext, fetchEnabledContext, saveContext } = useAppContext()
	const { period: p, transaction: t, transactions: ts } = appContext

	const [ period, setPeriod ] = useState(p)
  const [ transaction, setTransaction ] = useState<TTransaction | undefined>(t)
	const [ enabled, setEnabled ] = useState(fetchEnabledContext)
	
  const { 
		isLoading, isMutationSuccess, mutationFnName, error, transactions, years, refetch , mutateAsync
	} = useDashboardQuery({ 
		enabled, period, transactions: ts
	})
	const data = {
		period,
		transactions,
		years: getDistinctYears(years)
	}
	const wallet = getWallet(transactions)
	const	errorMessage = !error ? '' : getErrorMessage('generic') 
	const successMessage = isMutationSuccess && mutationFnName ? getSuccessMessage(mutationFnName) : ''
  const color: TMUIColor = transaction?.type === 'Despesa' ? 'error' : 'primary'

	useEffect(() => {
		saveContext({ ...appContext, ...data })
	}, [ isLoading ])

	useEffect(() => {
		refetch()
	}, [ period ])

	const handlePeriodChange = (e: SelectChangeEvent) => {
		setEnabled(true)
		setPeriod({ ...period, [ e.target.name ]: e.target.value })
	}

	const handleTransactionClick = (transaction: TTransaction) => {
		setTransaction({ ...transaction })
  }

	const handleUpdate = () => {
		saveContext({ ...appContext, transaction })
    navigate('/submit/update')
  }

  const handleDelete = async () => {
		const { id, recurrenceRef } = transaction as TTransaction
		await mutateAsync({ id: id as string, recurrenceRef })
		setTransaction(undefined)
		setEnabled(true)
		refetch()
  }

	return {
		isLoading, errorMessage, successMessage,
		data, wallet, transaction, color,
		handlePeriodChange, handleTransactionClick, handleUpdate, handleDelete
	}
}
