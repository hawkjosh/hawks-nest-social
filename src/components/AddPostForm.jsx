'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
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

async function addPost(content, userId) {
	await fetch('http://localhost:4000/posts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			id: uuidv4(),
			date: new Date().toISOString(),
			content,
			userId
		})
	})
}

export default function AddPostForm({ closeModal }) {
	const { data: session } = useSession()
	const router = useRouter()
	const [postContent, setPostContent] = useState('')

	const handleInputChange = (e) => setPostContent(e.target.value)

	const handleAddPost = async () => {
		const [{ id: existingUser }] = await getUser(session.user.email)
		// if (existingUser) {
		// 	await addPost(postContent, existingUser)
		// } else {
		// 	await addUser(session.user.name, session.user.email)
		// 	const [{ id: newUser }] = await getUser(session.user.email)
		// 	await addPost(postContent, newUser)
		// }
		if (!existingUser) {
			await addUser(session.user.name, session.user.email)
			const [{ id: newUser }] = await getUser(session.user.email)
			await addPost(postContent, newUser)
		} else {
			await addPost(postContent, existingUser)
		}
		router.refresh()
		setPostContent('')
		closeModal()
	}

	return (
		<form className="flex flex-col w-3/4 gap-4 h-1/2">
			<Textarea
				postContent={postContent}
				handleInputChange={handleInputChange}
				label={`What's on your mind?`}
			/>
			<Button label="Post It!" btnStyle="btn" onClick={handleAddPost} />
		</form>
	)
}
