'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button, Textarea } from '@/components/uiComponents'

export default function EditCommentForm({
	commentId,
	currCommentContent,
	closeModal
}) {
	const router = useRouter()
	const [commentContent, setCommentContent] = useState(currCommentContent)

	const handleInputChange = (e) => setCommentContent(e.target.value)

	const handleEditComment = async () => {
		closeModal()
		setCommentContent('')
		await fetch(`http://localhost:3000/api/comments/${commentId}`, {
			method: 'PATCH',
			body: JSON.stringify({ content: commentContent }),
			cache: 'no-store'
		})
		router.refresh()
	}

	return (
		<form className="flex flex-col w-3/4 gap-4 h-1/2">
			<Textarea
				textareaType="edit"
				postContent={commentContent}
				handleInputChange={handleInputChange}
				label="What should we change?"
			/>
			<Button label="Update" btnStyle="btn" onClick={handleEditComment} />
		</form>
	)
}
