import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SelectChangeEvent } from '@mui/material'
import { useAppContext } from '../../shared/contexts'
import { getDistinctYears, getErrorMessage, getWallet } from '../../shared/functions'
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
		isLoading, error, transactions, years, refetch , mutateAsync
	} = useDashboardQuery({ 
		enabled, period, transactions: ts
	})

	const data = {
		period,
		transactions,
		years: getDistinctYears(years)
	}
	const wallet = getWallet(transactions)
	const	message = !error ? '' : getErrorMessage('generic') 
  const color: TMUIColor = transaction?.type === 'Despesa' ? 'error' : 'primary'

	useEffect(() => {
		saveContext({ ...appContext, ...data })
	}, [ isLoading ])

	const handlePeriodChange = (e: SelectChangeEvent) => {
		setEnabled(true)
		setPeriod({ ...period, [ e.target.name ]: e.target.value })
	}

	const handleTransactionClick = (transaction: TTransaction) => {
		setTransaction(transaction)
  }

	const handleUpdate = () => {
		saveContext({ ...appContext, transaction })
    navigate('/submit/update')
  }

  const handleDelete = async () => {
		const id = transaction?.id as string
		await mutateAsync(id)
		setTransaction(undefined)
		setEnabled(true)
		refetch()
  }

	return {
		isLoading, message,
		data, wallet, transaction, color,
		handlePeriodChange, handleTransactionClick, handleUpdate, handleDelete
	}
}
