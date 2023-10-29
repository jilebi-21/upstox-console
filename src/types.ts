export type ProfileType = {
	email: string
	exchanges: string[]
	broker: string
	userId: string
	userName: string
	userType: string
	isActive: boolean
}

export type HoldingsType = {
	isin: string
	companyName: string
	tradingSymbol: string
	averagePrice: number
	lastPrice: number
	quantity: number
	pnl: number
	industry: string
}
