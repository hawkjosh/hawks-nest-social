'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Posts } from '../api/routes'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'

const EditPostForm = ({ postId, currPostContent, closeModal }) => {
	const router = useRouter()
	const [postContent, setPostContent] = useState(currPostContent)

	const handleInputChange = (e) => setPostContent(e.target.value)

	const handleEditPost = async () => {
		await Posts.edit(postId, postContent)
		router.refresh()
		setPostContent('')
		closeModal()
	}

	return (
		<form className="flex flex-col w-3/4 gap-4 h-1/2">
			<Textarea
				textareaType="edit"
				postContent={postContent}
				handleInputChange={handleInputChange}
				label="What should we change?"
			/>
			<Button label="Update" btnStyle="btn" onClick={handleEditPost} />
		</form>
	)
}

export default EditPostForm
