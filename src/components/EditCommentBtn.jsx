'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'

import EditCommentForm from '@/components/EditCommentForm'

import { Button, Modal } from '@/components/uiComponents'

import { IoPencil } from 'react-icons/io5'

export default function EditCommentBtn({
	commentId,
	currCommentContent,
	commentEmail
}) {
	const { data: session } = useSession()
	const [modalOpen, setModalOpen] = useState(false)

	const toggleModal = () => setModalOpen(!modalOpen)

	return (
		<>
			{session.user.email !== commentEmail ? null : (
				<>
					<Button
						label={<IoPencil />}
						btnStyle="icon"
						onClick={toggleModal}
						className="hover:text-blue-500"
					/>
					<Modal modalOpen={modalOpen} closeModal={toggleModal}>
						<EditCommentForm
							closeModal={toggleModal}
							commentId={commentId}
							currCommentContent={currCommentContent}
						/>
					</Modal>
				</>
			)}
		</>
	)
}
