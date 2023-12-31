'use client'

import { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

import AddPostForm from '@/components/AddPostForm'
import MenuBtn from '@/components/MenuBtn'

import { Button, Menu, Modal } from '@/components/uiComponents'

export default function AuthMenu() {
	const { data: session } = useSession()
	const [menuOpen, setMenuOpen] = useState(false)
	const [modalOpen, setModalOpen] = useState(false)

	const toggleMenu = () => setMenuOpen(!menuOpen)

	const toggleModal = () => {
		setMenuOpen(false)
		setModalOpen(!modalOpen)
	}
	
	const handleSignIn = () => signIn()

	const handleSignOut = () => {
		signOut()
		setMenuOpen(false)
	}

	return (
		<>
		{session ? (
			<>
				<div className="relative flex items-center gap-4">
					<MenuBtn closeMenu={() => setMenuOpen(false)} toggleMenu={toggleMenu} />
					<Menu
						menuOpen={menuOpen}
						closeMenu={toggleMenu}
						className="right-0 rounded-lg top-12 bg-slate-400 w-max"
					>
						<div className="flex flex-col items-center justify-center gap-4 p-4">
							<div className="text-xl font-extrabold text-white">
								{session.user.name}
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
		):(
			<Button label="Sign In" btnStyle="link" onClick={handleSignIn} />
			)}
			</>
	)
}
