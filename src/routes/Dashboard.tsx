import { Dashboard as DashboardPage } from 'pages/Dashboard'
import { useNavigate } from 'react-router-dom'

export const Dashboard = () => {
	const navigate = useNavigate()

	return <DashboardPage navigate={navigate} />
}
