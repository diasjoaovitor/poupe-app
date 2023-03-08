import { AddCircle } from '@mui/icons-material'
import { Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { Layout, Period, Transaction, Transactions, Wallet } from '../../shared/components'
import { useThemeContext } from '../../shared/contexts'
import { useDashboard } from './useDashboard'
import * as S from './style'

export const Dashboard: React.FC = () => {
	const { theme } = useThemeContext()

	const { 
		isLoading, 
		message,
		period, handlePeriodChange, 
		data, transaction, color,
		handleTransactionClick, handleUpdate, handleDelete
	} = useDashboard()

	return (
		<Layout page="Dashboard" isLoading={isLoading} notificationMessage={message} color={{ mui: color, title: "#f57c00" }}>
			<Box sx={S.Dashboard}>
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
					transaction={transaction} color={color} 
					handleUpdate={handleUpdate} handleDelete={handleDelete}
				/>
			</Box>
		</Layout>
	)
}
