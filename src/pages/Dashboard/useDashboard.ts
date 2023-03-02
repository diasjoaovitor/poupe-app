import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueries } from 'react-query'
import { SelectChangeEvent } from '@mui/material'
import { useAppContext, useAuthContext } from '../../shared/contexts'
import { destroy, getYears, read } from '../../shared/firebase'
import { getDistinctYears, getErrorMessage, getWallet } from '../../shared/functions'
import { TTransaction } from '../../shared/types'
import { year } from '../../shared/states'

export const useDashboard = () => {
  const navigate = useNavigate()

  const { user } = useAuthContext()
	const userId = user?.uid as string

	const { appContext, fetchEnabledContext, saveContext } = useAppContext()
	const { period: p, transaction: t } = appContext

	const [ period, setPeriod ] = useState(p)
  const [ transaction, setTransaction ] = useState<TTransaction | undefined>(t)
	const [ enabled, setEnabled ] = useState(fetchEnabledContext)

	const defaultData = {
		transactions: appContext.transactions,
		years: appContext.years,
		wallet: appContext.wallet
	}
	
  const [
		{ isLoading: readLoading, refetch, error: readError, data: transactions },
		{ isLoading: getYearsLoading, error: getYearsError, data: years },
	] = useQueries([
		{
			queryKey: 'read',
			queryFn: async () => {
				const { month, year } = period
				const p = `${month}/${year}`
				return	enabled ? await read(userId, p) : defaultData.transactions
			},
			enabled
		},
		{
			queryKey: 'getYears',
			queryFn: async () => (
				enabled ? await getYears(userId) : defaultData.years
			),
			enabled
		}
	])

	const { isLoading: mutationLoading, error: mutationError, mutateAsync } = useMutation(destroy)

	const isLoading = readLoading || getYearsLoading || mutationLoading
	
	const error = readError || getYearsError || mutationError

	const success = transactions && years

	let message = ''

  if (error) {
    message = getErrorMessage('generic')
    console.error(error)
  }

	const data =  success ? { 
		transactions,
		wallet: getWallet(transactions),
		years: getDistinctYears([ ...years, year ])
	} : defaultData

	useEffect(() => {
		if (success) {
			(async () => {
				await refetch()
			})()
		}
	}, [period, refetch])

	useEffect(() => {
		saveContext({ ...data, period, transaction })
		setEnabled(false)
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
		setEnabled(true)
  }

	return {
		isLoading, 
		message,
		period, handlePeriodChange, 
		data, transaction,
		handleTransactionClick, handleUpdate, 
		handleDelete
	}
}
