'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import AddPostForm from '@/components/AddPostForm'
import Button from '@/components/ui/Button'
import Menu from '@/components/ui/Menu'
import MenuBtn from '@/components/MenuBtn'
import Modal from '@/components/ui/Modal'

import { signOut, useSession } from 'next-auth/react'


export default function AuthMenu() {
	const menuRef = useRef()
	const addPostModalRef = useRef()
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
			<div className="relative flex items-center gap-4">
				<MenuBtn closeMenu={() => setMenuOpen(false)} toggleMenu={toggleMenu} />
				<Menu
					ref={menuRef}
					menuOpen={menuOpen}
					closeMenu={toggleMenu}
					className="right-0 rounded-lg top-12 bg-slate-400 w-max"
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
			<Modal ref={addPostModalRef} modalOpen={modalOpen} closeModal={toggleModal}>
				<AddPostForm closeModal={toggleModal} />
			</Modal>
		</>
	)
}
