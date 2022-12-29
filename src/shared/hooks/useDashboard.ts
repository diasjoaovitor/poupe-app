import { SelectChangeEvent } from "@mui/material"
import { useEffect, useState } from "react"
import { useQueries } from "react-query"
import { useAuthContext, useThemeContext } from "../contexts"
import { getYears, read } from "../firebase"
import { getErrorMessage, getWallet } from "../functions"
import { period as p, wallet as w, year as y } from "../states"
import { TTransaction } from "../types"

export const useDashboard = () => {
  const { user } = useAuthContext()
	const { theme } = useThemeContext()

	const [ message, setMessage ] = useState('')
	const [ period, setPeriod ] = useState(p)
	const [ years, setYears ] = useState([y])
	const [ wallet, setWallet ] = useState(w)
	const [ transactions, setTransactions ] = useState<TTransaction[]>([])

	const [
		{ isLoading: readLoading, refetch: readRefetch },
		{ isLoading: getYearsLoading, refetch: getYearsRefetch },
	] = useQueries([
		{
			queryKey: 'read',
			queryFn: async () => await read(user?.uid as string, `${period.month}/${period.year}`),
			onError: () => {
				setMessage(getErrorMessage('generic'))
			},
			onSuccess: (data: TTransaction[]) => {
				setWallet(getWallet(data))
				setTransactions(data)
			}
		},
		{
			queryKey: 'getYears',
			queryFn: () => (
				getYears(user?.uid as string)
			),
			onError: () => {
				setMessage(getErrorMessage('generic'))
			},
			onSuccess: (data: string[]) => {
				setYears(Array.from(new Set([
						y, ...data
					])).sort((a, b) => Number(b) - Number(a))
				)
			}
		}
	])

	useEffect(() => {
		readRefetch()
		getYearsRefetch()
	}, [period])

	const handleClose = () => {
		setMessage('')
	}

	const handlePeriodChange = (e: SelectChangeEvent) => {
		setPeriod({ ...period, [ e.target.name ]: e.target.value })
	}

	const handleTransactionClick = (transaction: TTransaction) => {
    console.log(transaction)
  }

	return {
		theme,
		isLoading: readLoading || getYearsLoading, 
		message, handleClose,
		period, handlePeriodChange, 
		years, wallet, 
		transactions, handleTransactionClick
	}
}
