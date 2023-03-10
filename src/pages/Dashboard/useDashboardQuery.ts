import { useState } from 'react'
import { useMutation, useQueries } from 'react-query'
import { destroy, getYears, read } from '../../shared/firebase'
import { TPeriod, TTransaction } from '../../shared/types'
import { useAuthContext } from '../../shared/contexts'
import { year } from '../../shared/states'

type Args = {
	enabled: boolean
	period: TPeriod
	transactions: TTransaction[]
}

export const useDashboardQuery = (args: Args) => {
	const { enabled, period, transactions: t} = args
	
	const { user } = useAuthContext()
	const userId = user?.uid as string
	
	const [ transactions, setTransactions ] = useState(t)
	const [ years, setYears ] = useState([year])
	console.log(enabled)
  const [
		{ isLoading: readLoading, refetch, error: readError },
		{ isLoading: getYearsLoading, error: getYearsError },
	] = useQueries([
		{
			queryKey: 'read',
			queryFn: async () => {
				const { month, year } = period
				const p = `${month}/${year}`
				if (enabled) return await read(userId, p)
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

	const { isLoading: mutationLoading, error: mutationError, mutateAsync } = useMutation(destroy)

	const isLoading = readLoading || getYearsLoading || mutationLoading
	
	const error = readError || getYearsError || mutationError
	console.log({ isLoading, error, transactions, years, enabled })

	return { isLoading, error, transactions, years, refetch, mutateAsync }
}