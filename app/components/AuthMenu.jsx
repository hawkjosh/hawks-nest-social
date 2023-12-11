'use client'
import { useState } from 'react'
import Link from 'next/link'
import AddPostForm from '@/components/AddPostForm'
import Button from '@/components/ui/Button'
import Menu from '@/components/ui/Menu'
import MenuBtn from '@/components/MenuBtn'
import Modal from '@/components/ui/Modal'

import { signOut, useSession } from 'next-auth/react'


export default function AuthMenu() {
	const { data: session } = useSession()
	const [menuOpen, setMenuOpen] = useState(false)
	const [modalOpen, setModalOpen] = useState(false)

	const toggleMenu = () => setMenuOpen(!menuOpen)

	const toggleModal = () => {
		setMenuOpen(false)
		setModalOpen(!modalOpen)
	}

	const handleSignOut = () => {
		signOut()
		setMenuOpen(false)
	}

	return (
		<>
			<div className="flex items-center gap-4 relative">
				<MenuBtn toggleMenu={toggleMenu} />
				<Menu
					menuOpen={menuOpen}
					closeMenu={toggleMenu}
					className="top-12 right-0 bg-slate-400 rounded-lg w-max"
				>
					<div className="flex flex-col items-center justify-center gap-4 p-4">
						<div className="text-xl font-extrabold text-white">
							{session?.user?.name}
						</div>
						<Link href="/">
							<Button label="Home" btnStyle="link" onClick={toggleMenu} />
						</Link>
						<Link href="/posts">
							<Button label="View Posts" btnStyle="link" onClick={toggleMenu} />
						</Link>
						<Button label="Add Post" btnStyle="link" onClick={toggleModal} />
						<Button label="Sign Out" btnStyle="link" onClick={handleSignOut} />
					</div>
				</Menu>
			</div>
			<Modal modalOpen={modalOpen} closeModal={toggleModal}>
				<AddPostForm closeModal={toggleModal} />
			</Modal>
		</>
	)
}
