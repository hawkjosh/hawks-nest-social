import { twMerge } from 'tailwind-merge'

export default function Textarea({
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
