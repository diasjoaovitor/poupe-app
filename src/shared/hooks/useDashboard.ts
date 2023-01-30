import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SelectChangeEvent } from "@mui/material"
import { useAppContext, useAuthContext } from "../contexts"
import { useDashboardMutation } from "./mutations"
import { useDashboardQuery } from "./queries"
import { logout } from "../firebase"
import { getDistinctYears, getErrorMessage, getWallet } from "../functions"
import { TTransaction } from "../types"
import { year } from '../states'

export const useDashboard = () => {
  const navigate = useNavigate()
  const { user } = useAuthContext()
	const { appContext, fetchEnabledContext, saveContext, clearContext } = useAppContext()
	const { period: p, transaction: t } = appContext

	const [ period, setPeriod ] = useState(p)
  const [ transaction, setTransaction ] = useState<TTransaction | undefined>(t)
	const [ enabled, setEnabled ] = useState(fetchEnabledContext)
	const [ loader, setLoader ] = useState(false)
	const [ message, setMessage ] = useState('')

	const { 
		isLoading: queryLoading, success, error, data: { transactions, years }, refetch 
	} = useDashboardQuery(user?.uid as string, `${period.month}/${period.year}`, appContext, enabled)

	const mutation = useDashboardMutation()

	const isLoading = queryLoading || loader
	
	const data = { 
		transactions,
		wallet: getWallet(transactions),
		years: getDistinctYears([ ...years, year ])
	}
	
	error && setMessage(getErrorMessage('generic'))

	useEffect(() => {
		if (success) {
			(async () => {
				await refetch()
				setLoader(false)
			})()
		}
	}, [period, refetch])

	useEffect(() => {
		saveContext({ ...data, period, transaction })
		setEnabled(false)
	}, [ isLoading ])

	const handleLogout = () => {
		clearContext()
		logout()
	} 

	const handleClose = () => {
		setMessage('')
    setTransaction(undefined)
	}

	const handlePeriodChange = (e: SelectChangeEvent) => {
		setEnabled(true)
		setLoader(true)
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
		try {
			setLoader(true)
			const id = transaction?.id as string
			setTransaction(undefined)
			await mutation.mutateAsync(id)
			setEnabled(true)
		} catch (error) {
      const message = getErrorMessage('generic')
      setMessage(message)
      console.error(error)
    } finally {
      setLoader(false)
		}
		
  }

	return {
		isLoading, 
		handleLogout,
		message, handleClose,
		period, handlePeriodChange, 
		data, transaction,
		handleTransactionClick, handleUpdate, 
		handleDelete
	}
}
