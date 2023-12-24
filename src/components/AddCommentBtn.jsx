'use client'

import { useState } from 'react'

import AddCommentForm from '@/components/AddCommentForm'

import { Button, Modal } from '@/components/uiComponents'

import { IoChatboxEllipsesOutline } from 'react-icons/io5'

export default function AddCommentBtn({ postId }) {
	const [modalOpen, setModalOpen] = useState(false)

	const toggleModal = () => setModalOpen(!modalOpen)

	return (
		<>
			<Button
				label={<IoChatboxEllipsesOutline />}
				btnStyle="icon"
				onClick={toggleModal}
				className="hover:text-green-400"
			/>
			<Modal modalOpen={modalOpen} closeModal={toggleModal}>
				<AddCommentForm postId={postId} closeModal={toggleModal} />
			</Modal>
		</>
	)
}
