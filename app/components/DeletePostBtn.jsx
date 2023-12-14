'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Posts } from '../api/routes'
import Button from '@/components/ui/Button'
import { IoTrash } from 'react-icons/io5'

const DeletePostBtn = ({ postId, postEmail }) => {
	const { data: session } = useSession()
	const router = useRouter()

	const handleDeletePost = async () => {
		await Posts.delete(postId)
		router.refresh()
	}

	return (
		<>
			{session?.user?.email !== postEmail ? null : (
				<Button
					label={<IoTrash />}
					btnStyle="icon"
					onClick={handleDeletePost}
					className="hover:text-red-500"
				/>
			)}
		</>
	)
}

export default DeletePostBtn
