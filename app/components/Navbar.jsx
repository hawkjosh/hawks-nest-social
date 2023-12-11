import Link from 'next/link'
import AuthMenu from '@/components/AuthMenu'
import { TfiComments } from 'react-icons/tfi'

export default function Navbar() {
	return (
		<div className="flex items-center justify-between pb-4 mx-auto my-10 border-b-2 border-gray-400 max-w-7xl">
			<Link href="/" className="flex items-center gap-4">
				<TfiComments size="40" color="red" />
				<div className="text-3xl text-blue-600">Hawk's Nest Social</div>
			</Link>
			<AuthMenu />
		</div>
	)
}
