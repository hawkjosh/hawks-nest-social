import Link from 'next/link'
import Button from '@/app/components/ui/Button'
import { IoHome, IoAddCircle } from 'react-icons/io5'

export default function NavLinks({ openModal }) {
	return (
		<div className='flex items-center gap-6'>
			<Link href='/'>
				<Button
					label={<IoHome />}
					btnStyle='icon'
					className='hover:text-gray-950'
				/>
			</Link>
			<Button
				label={<IoAddCircle />}
				btnStyle='icon'
				className='hover:text-gray-950'
				onClick={openModal}
			/>
		</div>
	)
}
