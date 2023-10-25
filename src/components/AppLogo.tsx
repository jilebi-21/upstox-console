interface Props extends React.HTMLAttributes<HTMLOrSVGElement> {
	size: number
	full?: boolean
}

const AppLogo = ({ size, ...props }: Props) => {
	return (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<svg width={size} height={size} viewBox="0 0 32 17.803" {...props}>
				<path
					d="M25.458,10.6a3.9,3.9,0,0,0,3.982-4.089,4.018,4.018,0,0,0-3.987-4.22,4.112,4.112,0,0,0-4.1,4.221,4.007,4.007,0,0,0,4.1,4.088ZM32,6.5a6.092,6.092,0,0,1-6.236,6.388,5.306,5.306,0,0,1-4.428-1.948V17.8H18.774V.258h2.561V1.946A5.27,5.27,0,0,1,25.764,0,6.188,6.188,0,0,1,32,6.5Zm-26.4.39A8.1,8.1,0,0,0,8.165,3.934v3.3c0,2.053,1.124,3.239,3.027,3.239a3.227,3.227,0,0,0,3.494-3.239V.264h2.566V12.647H14.676V11.083A4.477,4.477,0,0,1,10.8,12.9c-3.389,0-5.185-2.116-5.185-5.122l0-.886ZM0,5.826Zm0,0A5.682,5.682,0,0,0,3.991,4.19,5.546,5.546,0,0,0,5.645.253H8.157a7.984,7.984,0,0,1-2.39,5.694A8.214,8.214,0,0,1,0,8.31Z"
					transform="translate(0)"
					fill="#5a2989"
				/>
			</svg>
			{props.full && <p style={{ marginLeft: 5, marginTop: 10 }}>console</p>}
		</div>
	)
}

export default AppLogo
