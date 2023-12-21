'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Users, Comments } from '../api/routes'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'

import { useSession } from 'next-auth/react'

const AddCommentForm = ({ postId, closeModal }) => {
	const { data: session } = useSession()
	const router = useRouter()
	const [commentContent, setCommentContent] = useState('')

	const handleInputChange = (e) => setCommentContent(e.target.value)

	const handleAddComment = async () => {
		const existingUserData = await Users.getOne('email', session.user.email)
		if (existingUserData.length) {
			await Comments.add(commentContent, existingUserData[0].id, postId)
		} else {
		await Users.add(session.user.name, session.user.email)
		const newUserData = await Users.getOne('email', session.user.email)
		await Comments.add(commentContent, newUserData[0].id, postId)
		}
		router.refresh()
		setCommentContent('')
		closeModal()
	}

	return (
		<form className="flex flex-col w-3/4 gap-4 h-1/2">
			<Textarea
				commentContent={commentContent}
				handleInputChange={handleInputChange}
				label={`Okay, let's hear your comment on this post...`}
			/>
			<Button label="Comment!" btnStyle="btn" onClick={handleAddComment} />
		</form>
	)
}

export default AddCommentForm
