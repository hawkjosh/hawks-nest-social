'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'

async function editComment(id, content) {
	await fetch(`http://localhost:4000/comments/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ content })
	})
}

export default function EditCommentForm({
	commentId,
	currCommentContent,
	closeModal
}) {
	const router = useRouter()
	const [commentContent, setCommentContent] = useState(currCommentContent)

	const handleInputChange = (e) => setCommentContent(e.target.value)

	const handleEditComment = async () => {
		await editComment(commentId, commentContent)
		router.refresh()
		setCommentContent('')
		closeModal()
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
