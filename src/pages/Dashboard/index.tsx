import { Box } from "@mui/material"
import { AppBar, Loader, Notification, Period, Transaction, Transactions, Wallet } from "../../shared/components"
import { useThemeContext } from "../../shared/contexts"
import { useDashboard } from "../../shared/hooks"
import * as S from './style'

export const Dashboard: React.FC = () => {
	const { theme } = useThemeContext()

	const { 
		isLoading, message, handleClose,
		period, handlePeriodChange, 
		years, wallet, 
		transactions, transaction,
		handleTransactionClick, handleUpdate, handleDelete
	} = useDashboard()

	return (
		<Box sx={S.dashboard}>
			<AppBar />
			<Period 
				month={period.month} year={period.year} years={years}
				handleChange={handlePeriodChange}
			/>
			<Wallet {...wallet} />
			<Transactions 
				transactions={transactions} 
				color={{
					red: theme.palette.error.dark,
					blue: theme.palette.primary.dark
				}}
				handleClick={handleTransactionClick} 
			/>
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
