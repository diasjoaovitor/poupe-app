import { Box } from "@mui/material"
import { AppBar, Loader, Notification, Period, Transactions, Wallet } from "../../shared/components"
import { useDashboard } from "../../shared/hooks"
import * as S from './style'

export const Dashboard: React.FC = () => {
	const { 
		theme,
		isLoading, message, handleClose,
		period, handlePeriodChange, 
		years, wallet, 
		transactions, handleTransactionClick
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
				handleClick={handleTransactionClick} />
			<Loader open={isLoading} />
			<Notification message={message} handleClose={handleClose} />
		</Box>
	)
}
