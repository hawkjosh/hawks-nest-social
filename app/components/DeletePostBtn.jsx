'use client'
import { useRouter } from 'next/navigation'
import { deletePost } from '../api/routes'
import Button from '@/components/ui/Button'
import { IoTrash } from 'react-icons/io5'

const DeletePostBtn = ({ postId }) => {
	const router = useRouter()

	const handleDeletePost = async () => {
		await deletePost(postId)
		router.refresh()
	}

	return (
		<Button
			label={<IoTrash />}
			btnStyle='icon'
			onClick={handleDeletePost}
			className='hover:text-red-500'
		/>
	)
}

export default DeletePostBtn
