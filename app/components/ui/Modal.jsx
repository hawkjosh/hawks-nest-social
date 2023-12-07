import { twMerge } from 'tailwind-merge'
import Button from '@/components/ui/Button'
import { IoCloseCircle } from 'react-icons/io5'

export default function Modal({
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
					<div className='fixed top-0 left-0 z-0 w-full h-full bg-black opacity-50' />
					<div
						className={twMerge(
							`bg-slate-500 rounded-xl w-3/4 h-3/4 z-10 p-2 absolute place-content-center place-items-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ${
								modalOpen ? 'flex' : 'hidden'
							}`,
							className
						)}
						{...props}>
						{children}
						<Button
							label={<IoCloseCircle />}
							btnStyle='icon'
							onClick={closeModal}
							className='absolute top-0 right-0 m-2 text-white hover:text-yellow-300'
						/>
					</div>
				</>
			)}
		</>
	)
}
