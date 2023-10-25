import './not-found-page-styles.scss'

function NotFoundPage() {
	return (
		<div className="page-not-found-main-container">
			<div className="container">
				<p className="error-code">404</p>
				<p className="title">Page not found</p>
				<div className="description">The page you are looking for is not available.</div>
				<a className="link" href="/dashboard">
					Navigate to Dashboard
				</a>
			</div>
		</div>
	)
}

export default NotFoundPage
