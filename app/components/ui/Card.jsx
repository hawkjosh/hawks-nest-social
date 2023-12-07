import { twMerge } from 'tailwind-merge'

const Card = ({ title, className, children }) => {
	return (
		<div
			className={twMerge(
				'relative px-4 py-3 overflow-hidden rounded-lg shadow-md',
				className
			)}>
			<div className='mb-0 text-base font-semibold text-gray-700'>{title}</div>
			{children}
		</div>
	)
}

export default Card