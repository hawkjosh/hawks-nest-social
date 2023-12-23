'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { v4 as uuidv4 } from 'uuid'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'

async function getUser(email) {
	const res = await fetch(`http://localhost:4000/users?email=${email}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
	return await res.json()
}

async function addUser(username, email) {
	await fetch('http://localhost:4000/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			id: uuidv4(),
			username,
			email
		})
	})
}

async function addComment(content, userId, postId) {
	await fetch('http://localhost:4000/comments', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			id: uuidv4(),
			date: new Date().toISOString(),
			content,
			userId,
			postId
		})
	})
}

export default function AddCommentForm({ postId, closeModal }) {
	const { data: session } = useSession()
	const router = useRouter()
	const [commentContent, setCommentContent] = useState('')

	const handleInputChange = (e) => setCommentContent(e.target.value)

	const handleAddComment = async () => {
		const [{ id: existingUser }] = await getUser(session.user.email)
		if (existingUser) {
			await addComment(commentContent, existingUser, postId)
		} else {
			await addUser(session.user.name, session.user.email)
			const [{ id: newUser }] = await getUser(session.user.email)
			await addComment(commentContent, newUser, postId)
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
