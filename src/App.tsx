import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import DashboardPage from './routes/dashboard/DashboardPage'
import ProfilePage from './routes/profile/ProfilePage'
import HoldingsPage from './routes/holdings/HoldingsPage'
import NotFoundPage from './routes/not-found/NotFoundPage'
import AppBar from './components/AppBar'

function App() {
	const location = useLocation()

	const validRoutes = ['/dashboard', '/holdings', '/profile']
	const showAppBar = validRoutes.includes(location.pathname)

	return (
		<>
			{showAppBar && <AppBar />}
			<div className="safe-view-content-style">
				<Routes>
					<Route path="/" element={<Navigate to="/dashboard" replace />} />
					<Route path="/dashboard" element={<DashboardPage />} />
					<Route path="/holdings" element={<HoldingsPage />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</div>
		</>
	)
}

export default App
