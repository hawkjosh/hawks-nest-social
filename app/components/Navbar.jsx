'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import AddPostForm from '@/components/AddPostForm'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { IoAddCircle } from 'react-icons/io5'
import { TfiComments } from 'react-icons/tfi'
import { LuLayoutDashboard } from 'react-icons/lu'

import { signIn, signOut, useSession } from 'next-auth/react'

function AuthButton() {
	const { data: session } = useSession()

	if (session) {
		return (
			<>
				{session?.user?.image && (
					<img
						src={session.user.image}
						alt={session.user.name}
						className="w-8 h-8 rounded-full"
					/>
				)}
				{session?.user?.name}
				<Button label="Sign Out" btnStyle="text" onClick={() => signOut()} />
			</>
		)
	}

	return (
		<>
			Not signed in <br />
			<Button label="Sign In" btnStyle="text" onClick={() => signIn()} />
		</>
	)
}

const ACTIVE_ROUTE = 'py-1 px-2 text-gray-300 bg-gray-700'
const INACTIVE_ROUTE =
	'py-1 px-2 text-gray-500 hover:text-gray-300 hover:bg-gray-700'

export default function Navbar() {
	const pathname = usePathname()
	const [modalOpen, setModalOpen] = useState(false)

	const toggleModal = () => {
		setModalOpen(!modalOpen)
	}

	return (
		<div className="flex items-center justify-between pb-4 mx-auto my-10 border-b-2 border-gray-400 max-w-7xl">
			<Link href="/" className="flex items-center gap-4">
				<TfiComments size="40" color="red" />
				<div className="text-3xl text-blue-600">Hawk's Nest Social</div>
			</Link>
			{pathname === '/' && (
				<Link href="/posts">
					<Button
						label={<LuLayoutDashboard />}
						btnStyle="icon"
						className="hover:text-orange-500"
					/>
				</Link>
			)}
			{pathname === '/posts' && (
				<div>
					<Button
						label={<IoAddCircle />}
						btnStyle="icon"
						className="hover:text-green-500"
						onClick={toggleModal}
					/>
					<Modal modalOpen={modalOpen} closeModal={toggleModal}>
						<AddPostForm closeModal={toggleModal} />
					</Modal>
				</div>
			)}
			<div className="flex items-center gap-4">
				<AuthButton />
			</div>
		</div>
	)
}
