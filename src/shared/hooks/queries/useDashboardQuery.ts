import { useQueries } from "react-query"
import { getYears, read } from "../../firebase"
import { TAppData } from "../../types"

export const useDashboardQuery = (
	userId: string, period: string, appContext: TAppData, enabled: boolean
) => {
	const defaultData = {
		transactions: appContext.transactions,
		years: appContext.years
	}
	
  const [
		{ isLoading: readLoading, refetch, error: readError, data: transactions },
		{ isLoading: getYearsLoading, error: getYearsError, data: years },
	] = useQueries([
		{
			queryKey: 'read',
			queryFn: () => (
				enabled ? read(userId, period) : defaultData.transactions
			),
			enabled
		},
		{
			queryKey: 'getYears',
			queryFn: () => (
				enabled ? getYears(userId) : defaultData.years
			),
			enabled
		}
	])


	const isLoading = readLoading || getYearsLoading
	const success = transactions && years
	const error = readError || getYearsError 

	const data =  success ? { years, transactions } : defaultData

  return { isLoading, success, error, data, refetch }
}
