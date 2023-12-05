import Link from 'next/link'
import Button from '@/components/ui/Button'
import { IoHome } from 'react-icons/io5'
import { IoList } from 'react-icons/io5'
import { IoIosAddCircle } from 'react-icons/io'

export default function Navbar() {
	return (
		<nav>
			<div className='nav-brand'>My NextJS App</div>
			<div className='nav-links'>
				<Link href='/'>
					<Button
						label={<IoHome />}
						btnStyle='icon'
						className='hover:text-gray-950'
					/>
				</Link>
				<Link href='/posts'>
					<Button
						label={<IoList />}
						btnStyle='icon'
						className='hover:text-gray-950'
					/>
				</Link>
				<Link href='/posts/add'>
					<Button
						label={<IoIosAddCircle />}
						btnStyle='icon'
						className='hover:text-gray-950'
					/>
				</Link>
			</div>
		</nav>
	)
}
