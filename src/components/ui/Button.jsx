import { twMerge } from 'tailwind-merge'

export default function Button({
	label,
	btnType,
	btnStyle,
	className,
	children,
	...props
}) {
	return (
		<button
			type={btnType || 'button'}
			className={twMerge(
				'uppercase px-3 py-2 w-fit rounded-lg cursor-pointer font-medium text-sm text-center',
				btnStyle === 'btn' &&
					'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800',
				btnStyle === 'link' &&
					'border-none hover:bg-transparent hover:border-none hover:shadow-none hover:filter-none hover:text-blue-500',
				btnStyle === 'icon' &&
					'text-2xl p-1 rounded-full transition-transform duration-300 hover:transform hover:scale-125 hover:shadow-none hover:filter-none',
				props.disabled &&
					'text-gray-400 bg-gray-200 border-gray-200 cursor-not-allowed hover:bg-gray-200 hover:border-gray-200 hover:shadow-none hover:filter-none',
				className
			)}
			{...props}
		>
			{label || children}
		</button>
	)
}
