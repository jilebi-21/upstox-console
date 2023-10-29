import './holdings-page-styles.scss'
import { useEffect, useState } from 'react'
import { SERVER_URL } from '../../constants'
import { HoldingsType } from '../../types'

function HoldingsPage() {
	const [investedValue, setInvestedValue] = useState(0)
	const [totalPnl, setTotalPnl] = useState(0)
	const [holdingsData, setHoldingsData] = useState<HoldingsType[]>([])

	useEffect(() => {
		fetch(SERVER_URL + '/holdings')
			.then((response) => response.json())
			.then((data) => setHoldingsData(data))
	}, [])

	useEffect(() => {
		let invValue = 0
		let pnl = 0
		holdingsData.forEach((item, idx) => {
			pnl += item.pnl
			invValue += item.averagePrice * item.quantity
		})

		setInvestedValue(invValue)
		setTotalPnl(pnl)

		console.log(holdingsData[0])
	}, [holdingsData])

	function AccountValueCard() {
		function formatCurrency(num: number) {
			const isNegative = num < 0
			const absoluteValue = Math.abs(num)

			const formattedValue = absoluteValue.toLocaleString('en-IN', {
				style: 'currency',
				currency: 'INR',
			})

			return isNegative ? `-${formattedValue}` : formattedValue
		}

		function getProfitPercentage() {
			const profitPercentage = (totalPnl / investedValue) * 100

			if (profitPercentage >= 0) {
				return '+' + profitPercentage.toFixed(2) + '%'
			} else {
				return profitPercentage.toFixed(2) + '%'
			}
		}

		function formatDate(date: Date) {
			const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

			const day = date.getDate()
			const month = date.getMonth()
			const year = date.getFullYear()

			const formattedDate = `${day} ${months[month]} ${year}`
			return formattedDate
		}

		const coloredText = totalPnl > 0 ? 'green-text' : totalPnl < 0 ? 'red-text' : ''

		return (
			<div className="account-value-section">
				<div className={`account-value-container ${coloredText}-translucent`}>
					<p className="portfolio-value-label">Your portfolio value</p>
					<p className="portfolio-value">
						{formatCurrency(investedValue + totalPnl)} <span>as of {formatDate(new Date())}</span>
					</p>

					<div className="zone2">
						<div className="invested-value">
							<p className="label">Invested value</p>
							<p className="value">{formatCurrency(investedValue)}</p>
						</div>

						<div className="returns">
							<p className="label">Returns</p>
							<p className={`value ${coloredText}`}>
								{getProfitPercentage()} ({formatCurrency(totalPnl)})
							</p>
						</div>
					</div>
				</div>
			</div>
		)
	}

	if (holdingsData.length == 0) return null

	return (
		<div className="holdings-main-container">
			<div className="header-section">
				<h1 className="title">Holdings</h1>
				<AccountValueCard />
			</div>

			<div className="filter-container">
				<p className="results-count">
					Showing {holdingsData.length} of {holdingsData.length} results
				</p>
				<div hidden className="dropdown-container">
					<label>Segment</label>
					<select name="segment" id="segment" defaultValue={'equity'}>
						<option disabled>Select segment</option>
						<option value="all">All Segments</option>
						<option value="equity">Equity</option>
						{/* <option value="options">Futures & Options</option> */}
						<option value="options">Mutual Funds</option>
						{/* <option value="currency">Currency</option> */}
						<option hidden>sample to increase size</option>
					</select>
				</div>
			</div>

			<div className="table-container">
				<table cellSpacing={0}>
					<thead>
						<tr>
							<th className="start">Company Name</th>
							<th className="start">Script</th>
							<th>ISIN</th>
							<th className="end">Quantity</th>
							<th className="end">Avg. Price</th>
							<th className="end">Last Price</th>
							<th className="end">P&L</th>
						</tr>
					</thead>
					<tbody>
						{holdingsData.map((stock, index) => (
							<tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
								<td>{stock.companyName}</td>
								<td>{stock.industry}</td>
								<td className="center">{stock.isin}</td>
								<td className="end">{stock.quantity.toFixed(2)}</td>
								<td className="end">{stock.averagePrice.toFixed(2)}</td>
								<td className="end">{stock.lastPrice.toFixed(2)}</td>
								<td
									className="end"
									style={{ color: stock.pnl > 0 ? '#0B8462' : '#DB552D', fontWeight: 'bold' }}
								>
									{stock.pnl > 0 && '+'}
									{stock.pnl.toFixed(2)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default HoldingsPage
