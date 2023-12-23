import { twMerge } from 'tailwind-merge'

export default function Menu({
	menuOpen,
	closeMenu,
	className,
	children,
	...props
}) {
	return (
		<>
			{menuOpen && (
				<div
          className={twMerge('absolute', className)}
          {...props}>
					{children}
				</div>
			)}
		</>
	)
}
