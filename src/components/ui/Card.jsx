import { twMerge } from 'tailwind-merge'

export default function Card({ className, children }) {
	return (
		<div
			className={twMerge(
				'px-4 py-3 overflow-hidden rounded-lg shadow-md',
				className
			)}>
			{children}
		</div>
	)
}
