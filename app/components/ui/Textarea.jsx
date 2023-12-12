import { twMerge } from 'tailwind-merge'

export default function Textarea({ postContent, handleInputChange, label, className }) {
	return (
		<div className="relative h-full">
			<textarea
				type="text"
				id="customTextarea"
				className={twMerge("text-white px-2.5 pb-2.5 pt-4 w-full h-full text-lg bg-transparent rounded-lg border-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-yellow-400 peer resize-none", className)}
				value={postContent}
				onChange={handleInputChange}
				placeholder={' '}
			/>
			<label
				htmlFor="customTextarea"
				className="absolute text-5xl text-white duration-300 transform z-10 origin-[0] px-8 peer-focus:px-1 peer-focus:text-yellow-400 peer-focus:bg-slate-500 peer-focus:text-base peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-90 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
			>
				{label}
			</label>
		</div>
	)
}
