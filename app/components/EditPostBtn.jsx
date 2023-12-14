'use client'
import { useRouter } from 'next/navigation'
import { Posts } from '../api/routes'
import Button from '@/components/ui/Button'
import { IoTrash } from 'react-icons/io5'

const EditPostBtn = ({ postId }) => {
	const router = useRouter()

	const handleBtnClick = async () => {
		await Posts.delete(postId)
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

export default EditPostBtn