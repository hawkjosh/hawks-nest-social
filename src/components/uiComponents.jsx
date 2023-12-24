import { twMerge } from 'tailwind-merge'
import { IoCloseCircle } from 'react-icons/io5'

export function Button({
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

export function Card({ className, children }) {
	return (
		<div
			className={twMerge(
				'px-4 py-3 overflow-hidden rounded-lg shadow-md',
				className
			)}
		>
			{children}
		</div>
	)
}

export function Menu({ menuOpen, closeMenu, className, children, ...props }) {
	return (
		<>
			{menuOpen && (
				<div className={twMerge('absolute', className)} {...props}>
					{children}
				</div>
			)}
		</>
	)
}

export function Modal({
	modalOpen,
	closeModal,
	className,
	children,
	...props
}) {
	return (
		<>
			{modalOpen && (
				<>
					<div className="fixed top-0 left-0 z-0 w-full h-full bg-black opacity-60" />
					<div
						className={twMerge(
							`bg-slate-500 rounded-xl w-3/4 h-3/4 z-10 p-2 absolute place-content-center place-items-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ${
								modalOpen ? 'flex' : 'hidden'
							}`,
							className
						)}
						{...props}
					>
						{children}
						<Button
							label={<IoCloseCircle />}
							btnStyle="icon"
							onClick={closeModal}
							className="absolute top-0 right-0 m-2 text-white hover:text-yellow-400"
						/>
					</div>
				</>
			)}
		</>
	)
}

export function Textarea({
	textareaType,
	postContent,
	handleInputChange,
	label,
	textareaStyles,
	labelStyles,
	className
}) {
	return (
		<div className={twMerge('relative h-full', className)}>
			<textarea
				type="text"
				id="customTextarea"
				className={twMerge(
					'text-white px-2.5 pb-2.5 pt-4 w-full h-full text-lg bg-transparent rounded-lg border-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-yellow-400 peer resize-none',
					textareaType === 'edit' && 'border-yellow-400 peer',
					textareaStyles
				)}
				value={postContent}
				onChange={handleInputChange}
				placeholder={' '}
			/>
			<label
				htmlFor="customTextarea"
				className={twMerge(
					'absolute text-5xl text-white duration-300 transform z-10 origin-[0] px-8 peer-focus:px-1 peer-focus:text-yellow-400 peer-focus:bg-slate-500 peer-focus:text-base peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-90 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1',
					textareaType === 'edit' &&
						'absolute text-base text-yellow-400 z-10 px-1 bg-slate-500 top-1 transform scale-90 -translate-y-4 start-1',
					labelStyles
				)}
			>
				{label}
			</label>
		</div>
	)
}
