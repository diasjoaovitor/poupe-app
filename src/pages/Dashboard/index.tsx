import { Box } from "@mui/material"
import { AppBar, Loader, Notification, Period, Wallet } from "../../shared/components"
import { useDashboard } from "../../shared/hooks"
import * as S from './style'

export const Dashboard: React.FC = () => {
	const { 
		isLoading, message, handleClose,
		period, handlePeriodChange, 
		years, wallet
	} = useDashboard()

	return (
		<Box sx={S.dashboard}>
			<AppBar />
			<Period 
				month={period.month} year={period.year} years={years}
				handleChange={handlePeriodChange}
			/>
			<Wallet {...wallet} />
			<Loader open={isLoading} />
			<Notification message={message} handleClose={handleClose} />
		</Box>
	)
}
