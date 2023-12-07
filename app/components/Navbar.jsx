'use client'
import { useState } from 'react'
import NavLinks from './NavLinks'
import Modal from '@/app/components/ui/Modal'
import AddPostForm from '@/app/components/AddPostForm'

export default function Navbar() {
	const [modalOpen, setModalOpen] = useState(false)

	const openModal = () => {
		setModalOpen(true)
	}

	const closeModal = () => {
		setModalOpen(false)
	}

	return (
		<nav className='flex items-center justify-between pb-4 mx-auto my-10 border-b-2 border-gray-400 max-w-7xl'>
			<div className='text-2xl font-bold uppercase'>My NextJS App</div>
			<NavLinks openModal={openModal} />
			<Modal
				modalOpen={modalOpen}
				closeModal={closeModal}>
				<AddPostForm closeModal={closeModal} />
			</Modal>
		</nav>
	)
}
