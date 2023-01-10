import { SelectChangeEvent } from "@mui/material"
import { useEffect, useState } from "react"
import { useQueries } from "react-query"
import { useAuthContext } from "../contexts"
import { getYears, read } from "../firebase"
import { getErrorMessage, getWallet } from "../functions"
import { period as p, wallet as w, year as y } from "../states"
import { TTransaction } from "../types"

export const useDashboard = () => {
  const { user } = useAuthContext()

	const [ message, setMessage ] = useState('')
	const [ period, setPeriod ] = useState(p)
	const [ years, setYears ] = useState([y])
	const [ wallet, setWallet ] = useState(w)
	const [ transactions, setTransactions ] = useState<TTransaction[]>([])
  const [ transaction, setTransaction ] = useState<TTransaction>()

	const [
		{ isLoading: readLoading, refetch: readRefetch, error: readError },
		{ isLoading: getYearsLoading, refetch: getYearsRefetch , error: getYearsError },
	] = useQueries([
		{
			queryKey: 'read',
			queryFn: async () => await read(user?.uid as string, `${period.month}/${period.year}`),
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
			onSuccess: (data: string[]) => {
				setYears(Array.from(new Set([
						y, ...data
					])).sort((a, b) => Number(b) - Number(a))
				)
			}
		}
	])

	const isLoading = readLoading || getYearsLoading
	const error = readError || getYearsError 
	
	error && setMessage(getErrorMessage('generic'))

	useEffect(() => {
		readRefetch()
		getYearsRefetch()
	}, [period])

	const handleClose = () => {
		setMessage('')
    setTransaction(undefined)
	}

	const handlePeriodChange = (e: SelectChangeEvent) => {
		setPeriod({ ...period, [ e.target.name ]: e.target.value })
	}

	const handleTransactionClick = (transaction: TTransaction) => {
		setTransaction(transaction)
  }

	const handleUpdate = () => {
    console.log('update', transaction)
  }

  const handleDelete = () => {
		console.log('delete', transaction)
  }

	return {
		isLoading, 
		message, handleClose,
		period, handlePeriodChange, 
		years, wallet, 
		transactions, transaction, 
		handleTransactionClick, handleUpdate, handleDelete
	}
}
