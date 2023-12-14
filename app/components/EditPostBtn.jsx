'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Button from '@/components/ui/Button'
import EditPostForm from '@/components/EditPostForm'
import Modal from '@/components/ui/Modal'
import { IoPencil } from 'react-icons/io5'

const EditPostBtn = ({ postId, currPostContent, postEmail }) => {
	const { data: session } = useSession()
	const [modalOpen, setModalOpen] = useState(false)

	const toggleModal = () => setModalOpen(!modalOpen)

	return (
		<>
			{session?.user?.email !== postEmail ? null : (
				<>
					<Button
						label={<IoPencil />}
						btnStyle="icon"
						onClick={toggleModal}
						className="hover:text-blue-500"
					/>
					<Modal modalOpen={modalOpen} closeModal={toggleModal}>
						<EditPostForm
							closeModal={toggleModal}
							postId={postId}
							currPostContent={currPostContent}
						/>
					</Modal>
				</>
			)}
		</>
	)
}

export default EditPostBtn
