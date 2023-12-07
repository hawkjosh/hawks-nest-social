'use client'
import { useState } from 'react'
import AddPostForm from '@/components/AddPostForm'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { IoAddCircle } from 'react-icons/io5'
import { TfiComments } from "react-icons/tfi"

export default function Navbar() {
	const [modalOpen, setModalOpen] = useState(false)

	const toggleModal = () => {
		setModalOpen(!modalOpen)
	}

	return (
		<div className='flex items-center justify-between pb-4 mx-auto my-10 border-b-2 border-gray-400 max-w-7xl'>
			{/* <div className='text-2xl font-bold uppercase'>My NextJS App</div> */}
			<TfiComments size='40' color='red' />
			<Button
				label={<IoAddCircle />}
				btnStyle='icon'
				className='hover:text-green-500'
				onClick={toggleModal}
			/>
			<Modal
				modalOpen={modalOpen}
				closeModal={toggleModal}>
				<AddPostForm closeModal={toggleModal} />
			</Modal>
		</div>
	)
}
