'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

import { Button, Textarea } from '@/components/uiComponents'

export default function AddPostForm({ closeModal }) {
	const { data: session } = useSession()
	const router = useRouter()
	const [postContent, setPostContent] = useState('')

	const handleInputChange = (e) => setPostContent(e.target.value)

	const handleAddPost = async () => {
		closeModal()
		setPostContent('')

		const { id: currentUserId } = await fetch(
			`http://localhost:3000/api/users/${session.user.email}`,
			{
				method: 'GET',
				cache: 'no-store'
			}
		).then((res) => res.json())

		await fetch('http://localhost:3000/api/posts', {
			method: 'POST',
			body: JSON.stringify({
				id: uuidv4(),
				date: new Date().toISOString(),
				content: postContent,
				userId: currentUserId
			}),
			cache: 'no-store'
		})

		router.refresh()
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
