import './profile-page-styles.scss'
import { useEffect, useState } from 'react'
import { SERVER_URL } from '../../constants'
import { ProfileType } from '../../types'

function ProfilePage() {
	const [profile, setProfile] = useState<ProfileType | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetch(SERVER_URL + '/profile')
			.then((response) => response.json())
			.then((data) => {
				if (!data.status) {
					throw Error('Failed to get data')
				}

				setProfile({
					email: data.data.email,
					exchanges: data.data.exchanges,
					broker: data.data.broker,
					userId: data.data.user_id,
					userName: data.data.user_name,
					userType: data.data.user_type,
					isActive: data.data.is_active,
				})
				setLoading(false)
			})
			.catch((error) => {
				console.error('Error fetching data:', error)
				setProfile(null)
				setLoading(false)
			})
	}, [])

	function getInitials(input: string): string {
		return input
			.split(' ')
			.map((word) => word.charAt(0))
			.join('')
			.slice(0, 2)
	}

	return (
		<div className="profile-main-container">
			{loading && <div>Loading...</div>}
			{profile == null && <p>Null</p>}
			{profile != null && (
				<div>
					<h1 className="title">Account</h1>

					<div className="user-profile">
						<div className="main-section">
							<div className="avatar">
								<span>{getInitials(profile?.userName)}</span>
							</div>

							<div className="profile-field">
								<p className="tile-title">Name</p>
								<p className="tile-value">{profile?.userName}</p>
							</div>

							<div className="profile-field">
								<p className="tile-title">User ID</p>
								<p className="tile-value">{profile?.userId}</p>
							</div>
						</div>

						<div className="other-section">
							<div className="profile-field">
								<p className="tile-title">Email</p>
								<p className="tile-value">{profile?.email}</p>
							</div>
							<div className="profile-field">
								<p className="tile-title">Broker</p>
								<p className="tile-value">{profile?.broker}</p>
							</div>
							<div className="profile-field">
								<p className="tile-title">Exchanges</p>
								<ul>{profile?.exchanges.map((exchange, index) => <li key={index}>{exchange}</li>)}</ul>
							</div>
							<div className="profile-field">
								<p className="tile-title">User Type</p>
								<p className="tile-value">{profile?.userType}</p>
							</div>
							<div className="profile-field">
								<p className="tile-title">Active</p>
								<p className="tile-value">{profile?.isActive ? 'Yes' : 'No'}</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default ProfilePage
