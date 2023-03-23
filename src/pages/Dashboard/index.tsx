import { Box } from '@mui/material'
import { Layout, Period, Transaction, Transactions, Wallet } from '../../shared/components'
import { useThemeContext } from '../../shared/contexts'
import { useApp } from '../../shared/hooks'
import { useDashboard } from './useDashboard'
import * as S from './style'

export const Dashboard: React.FC = () => {
	const { theme } = useThemeContext()
	const { handleNewTransaction } = useApp()
	const { 
		isLoading, errorMessage, successMessage,
		data, wallet, transaction, color,
		handlePeriodChange, handleTransactionClick, handleUpdate, handleDelete
	} = useDashboard()

	const { period, years, transactions } = data
	
	return (
		<Layout 
			page="Dashboard" isLoading={isLoading} 
			notificationMessage={errorMessage} successMessage={successMessage} 
			handleNewTransaction={handleNewTransaction}
			color={{ mui: color, title: "#f57c00" }}
		>
			<Box sx={S.Dashboard}>
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
					transaction={transaction} color={color} 
					handleUpdate={handleUpdate} handleDelete={handleDelete}
				/>
			</Box>
		</Layout>
	)
}
