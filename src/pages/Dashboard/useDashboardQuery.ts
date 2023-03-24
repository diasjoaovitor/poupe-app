import { useState } from 'react'
import { useMutation, useQueries } from 'react-query'
import { destroyTransaction, destroyTransactions, getRecurringTransactionIds, getTransactionsByPeriod, getYears } from '../../shared/firebase'
import { TPeriod, TTransaction } from '../../shared/types'
import { useAuthContext } from '../../shared/contexts'
import { year } from '../../shared/states'

type QueryArgs = {
	enabled: boolean
	period: TPeriod
	transactions: TTransaction[]
}

type MutationArgs = {
	id: string 
	recurrenceRef: string | undefined
}

export const useDashboardQuery = (args: QueryArgs) => {
	const { enabled, period, transactions: t} = args
	const { user } = useAuthContext()
	const userId = user?.uid as string
	
	const [ transactions, setTransactions ] = useState(t)
	const [ years, setYears ] = useState([year])

	const [
		{ isLoading: readLoading, refetch, error: readError },
		{ isLoading: getYearsLoading, error: getYearsError },
	] = useQueries([
		{
			queryKey: 'read',
			queryFn: async () => {
				const { month, year } = period
				const p = `${month}/${year}`
				if (enabled) return await getTransactionsByPeriod(userId, p)
			},
			enabled,
			onSuccess: (transactions: TTransaction[] | undefined) => {
				transactions && setTransactions(transactions)
			},
			onError: (error: any) => {
				console.error(error)
			}
		},
		{
			queryKey: 'getYears',
			queryFn: async () => {
				if (enabled) return await getYears(userId)
			},
			enabled,
			onSuccess: (years: (string | number)[] | undefined) => {
				years && setYears(y => [ ...years, ...y ])
			},
			onError: (error: any) => {
				console.error(error)
			}
		}
	])

	const { isLoading: mutationLoading, isSuccess: isMutationSuccess, data: mutationFnName, error: mutationError, mutateAsync } = useMutation({
		mutationFn: async (args: MutationArgs) => {
			const { id, recurrenceRef } = args
			if (!recurrenceRef) {
				await destroyTransaction(id)
				return 'destroyTransaction'
			}
			const recurringTransactions = await getRecurringTransactionIds(recurrenceRef)
			await destroyTransactions(recurringTransactions)
			return 'destroyTransactions'
		},
		onError: error => console.error(error)
	})

	const isLoading = readLoading || getYearsLoading || mutationLoading
	
	const error = readError || getYearsError || mutationError

	return { isLoading, isMutationSuccess, mutationFnName, error, transactions, years, refetch, mutateAsync }
}
