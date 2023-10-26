import './appbar.scss'
import { List, X } from 'phosphor-react'
import { useMediaQuery } from 'react-responsive'
import { useLocation, useNavigate } from 'react-router-dom'
import logoFull from '../assets/logo-full.svg'
import logoMini from '../assets/logo-mini.svg'

const AppBar = () => {
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
	const navigate = useNavigate()
	const location = useLocation()

	function handleSideNav(isOpen: boolean) {
		const sideBar = document.getElementById('side-bar')
		if (sideBar == undefined) return
		if (isOpen) {
			sideBar.style.height = '100%'
			sideBar.style.top = '0'
			sideBar.style.opacity = '1'
		} else {
			sideBar.style.height = '0px'
			sideBar.style.top = '-100px'
			sideBar.style.opacity = '0'
		}
	}

	const menuItems = [
		{ name: 'Dashboard', url: '/dashboard' },
		{ name: 'Portfolio', url: '/portfolio' },
		{ name: 'Profile', url: '/profile' },
	]

	return (
		<div className="appbar-main-container">
			<div className="appbar-content">
				<img src={isTabletOrMobile ? logoMini : logoFull} style={{ width: isTabletOrMobile ? 25 : 90 }} />

				<div>
					{isTabletOrMobile && (
						<div className="mobile-view-wrapper" id="side-bar">
							<div className="mobile-view-list">
								<div className="header">
									<X className="nav-icon" onClick={() => handleSideNav(false)} />
								</div>

								<ul>
									{menuItems.map((item, idx) => {
										return (
											<li
												key={idx}
												onClick={() => {
													handleSideNav(false)
													navigate(item.url)
												}}
											>
												{item.name}
											</li>
										)
									})}
								</ul>
							</div>
						</div>
					)}
				</div>
				{isTabletOrMobile && (
					<p className="page-label">{menuItems.find((item) => item.url === location.pathname)?.name || ''}</p>
				)}

				{!isTabletOrMobile && (
					<div className="menu-items-list">
						{menuItems.map((item, idx) => {
							return (
								<li
									className={`${item.url === location.pathname ? 'active' : ''}`}
									key={idx}
									onClick={() => navigate(item.url)}
								>
									{item.name}
								</li>
							)
						})}
					</div>
				)}

				{isTabletOrMobile && <List className="nav-icon" onClick={() => handleSideNav(true)} />}
			</div>
		</div>
	)
}

export default AppBar
