'use client'
import { useRouter } from 'next/navigation'
import Button from '@/app/components/ui/Button'
import { deletePost } from '../api/routes'
import { IoTrashOutline } from 'react-icons/io5'

const DeletePostBtn = ({ postId }) => {
	const router = useRouter()

	const handleDeletePost = async () => {
		await deletePost(postId)
		router.refresh()
	}

	return (
		<Button
			label={<IoTrashOutline />}
			btnStyle='icon'
			onClick={handleDeletePost}
			className='hover:text-red-500'
		/>
	)
}

export default DeletePostBtn
