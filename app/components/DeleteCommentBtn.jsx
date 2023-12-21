'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Comments } from '../api/routes'
import Button from '@/components/ui/Button'
import { IoTrash } from 'react-icons/io5'

const DeleteCommentBtn = ({ commentId, commentEmail }) => {
	const { data: session } = useSession()
	const router = useRouter()

	const handleDeleteComment = async () => {
		await Comments.delete(commentId)
		router.refresh()
	}

	return (
		<>
			{session?.user?.email !== commentEmail ? null : (
				<Button
					label={<IoTrash />}
					btnStyle="icon"
					onClick={handleDeleteComment}
					className="hover:text-red-500"
				/>
			)}
		</>
	)
}

export default DeleteCommentBtn