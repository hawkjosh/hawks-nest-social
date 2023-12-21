'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Comments } from '../api/routes'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'

const EditCommentForm = ({ commentId, currCommentContent, closeModal }) => {
	const router = useRouter()
	const [commentContent, setCommentContent] = useState(currCommentContent)

	const handleInputChange = (e) => setCommentContent(e.target.value)

	const handleEditComment = async () => {
		await Comments.edit(commentId, commentContent)
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

export default EditCommentForm
