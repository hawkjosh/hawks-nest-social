'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button, Textarea } from '@/components/uiComponents'

export default function EditPostForm({ postId, currPostContent, closeModal }) {
	const router = useRouter()
	const [postContent, setPostContent] = useState(currPostContent)

	const handleInputChange = (e) => setPostContent(e.target.value)

	const handleEditPost = async () => {
		closeModal()
		setPostContent('')
		await fetch(`http://localhost:3000/api/posts/${postId}`, {
			method: 'PATCH',
			body: JSON.stringify({ content: postContent }),
			cache: 'no-store'
		})
		router.refresh()
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
