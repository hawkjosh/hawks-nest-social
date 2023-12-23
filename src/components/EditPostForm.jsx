'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

import editPost from '@/components/HandleEditPostBtn'

// async function editPost(id, content) {
// 	await fetch(`http://localhost:4000/posts/${id}`, {
// 		method: 'PATCH',
// 		headers: {
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify({ content })
// 	})
// }

export default function EditPostForm({ postId, currPostContent, closeModal }) {
	const router = useRouter()
	const [postContent, setPostContent] = useState(currPostContent)

	const handleInputChange = (e) => setPostContent(e.target.value)

	const handleEditPost = async () => {
		await editPost(postId, postContent)
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
