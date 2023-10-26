import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import DashboardPage from './routes/dashboard/DashboardPage'
import ProfilePage from './routes/profile/ProfilePage'
import PortfolioPage from './routes/portfolio/PortfolioPage'
import NotFoundPage from './routes/not-found/NotFoundPage'
import AppBar from './components/AppBar'

function App() {
	const location = useLocation()

	const validRoutes = ['/dashboard', '/portfolio', '/profile']
	const showAppBar = validRoutes.includes(location.pathname)

	return (
		<>
			{showAppBar && (
				<div style={{ position: 'fixed' }}>
					<AppBar />
				</div>
			)}
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<div className="safe-view-content-style">
					<Routes>
						<Route path="/" element={<Navigate to="/dashboard" replace />} />
						<Route path="/dashboard" element={<DashboardPage />} />
						<Route path="/portfolio" element={<PortfolioPage />} />
						<Route path="/profile" element={<ProfilePage />} />
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</div>
			</div>
		</>
	)
}

export default App
