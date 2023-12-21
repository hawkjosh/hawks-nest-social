'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Button from '@/components/ui/Button'
import EditCommentForm from '@/components/EditCommentForm'
import Modal from '@/components/ui/Modal'
import { IoPencil } from 'react-icons/io5'

const EditCommentBtn = ({ commentId, currCommentContent, commentEmail }) => {
	const { data: session } = useSession()
	const [modalOpen, setModalOpen] = useState(false)

	const toggleModal = () => setModalOpen(!modalOpen)

	return (
		<>
			{session?.user?.email !== commentEmail ? null : (
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

export default EditCommentBtn
