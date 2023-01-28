import { AddCircle } from "@mui/icons-material"
import { Box } from "@mui/material"
import { Link } from "react-router-dom"
import { AppBar, Loader, Notification, Period, Transaction, Transactions, Wallet } from "../../shared/components"
import { useThemeContext } from "../../shared/contexts"
import { useDashboard } from "../../shared/hooks"
import * as S from './style'

export const Dashboard: React.FC = () => {
	const { theme } = useThemeContext()

	const { 
		isLoading, 
		handleLogout,
		message, handleClose,
		period, handlePeriodChange, 
		data, transaction,
		handleTransactionClick, handleUpdate, 
		handleDelete
	} = useDashboard()

	return (
		<Box sx={S.dashboard}>
			<AppBar handleLogout={handleLogout} />
			<Period 
				month={period.month} year={period.year} years={data.years}
				handleChange={handlePeriodChange}
			/>
			<Wallet {...data.wallet} />
			<Transactions 
				transactions={data.transactions} 
				color={{
					red: theme.palette.error.dark,
					blue: theme.palette.primary.dark
				}}
				handleClick={handleTransactionClick} 
			/>
			<Link to="/submit/create">
        <AddCircle fontSize="large" />
      </Link>
			<Transaction 
        transaction={transaction} 
        handleClose={handleClose}
        handleUpdate={handleUpdate}  
        handleDelete={handleDelete}
      />
			<Loader open={isLoading} />
			<Notification message={message} handleClose={handleClose} />
		</Box>
	)
}
