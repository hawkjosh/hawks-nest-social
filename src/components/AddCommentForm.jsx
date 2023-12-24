'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

import { Button, Textarea } from '@/components/uiComponents'

export default function AddCommentForm({ postId, closeModal }) {
	const { data: session } = useSession()
	const router = useRouter()
	const [commentContent, setCommentContent] = useState('')

	const handleInputChange = (e) => setCommentContent(e.target.value)

	const handleAddComment = async () => {
		closeModal()
		setCommentContent('')
		const { id: existingUser } = await fetch(
			`http://localhost:3000/api/users/${session.user.email}`,
			{
				method: 'GET',
				cache: 'no-store'
			}
		).then((res) => res.json())
		if (!existingUser) {
			await fetch('http://localhost:3000/api/users', {
				method: 'POST',
				body: JSON.stringify({
					id: uuidv4(),
					username: session.user.username,
					email: session.user.email
				}),
				cache: 'no-store'
			})
			const { id: newUser } = await fetch(
				`http://localhost:3000/api/users/${session.user.email}`,
				{
					method: 'GET',
					cache: 'no-store'
				}
			).then((res) => res.json())
			await fetch('http://localhost:3000/api/comments', {
				method: 'POST',
				body: JSON.stringify({
					id: uuidv4(),
					date: new Date().toISOString(),
					content: commentContent,
					userId: newUser,
					postId
				}),
				cache: 'no-store'
			})
		} else {
			await fetch('http://localhost:3000/api/comments', {
				method: 'POST',
				body: JSON.stringify({
					id: uuidv4(),
					date: new Date().toISOString(),
					content: commentContent,
					userId: existingUser,
					postId
				}),
				cache: 'no-store'
			})
		}
		router.refresh()
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
