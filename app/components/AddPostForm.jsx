'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addUser, getUserByEmail, addPost } from '../api/routes'
import { randUuid } from '@ngneat/falso'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'

import { useSession } from 'next-auth/react'

const AddPostForm = ({ closeModal }) => {
	const { data: session } = useSession()
	const router = useRouter()
	const [postContent, setPostContent] = useState('')

	const handleInputChange = (e) => setPostContent(e.target.value)

	const handleAddPost = async () => {
		const existingUserData = await getUserByEmail(session.user.email)
		if (existingUserData.length) {
			await addPost({
				id: randUuid(),
				date: new Date().toISOString(),
				content: postContent,
				userId: existingUserData[0].id
			})
		} else {
			const newUser = {
				id: randUuid(),
				username: session?.user?.name,
				email: session?.user?.email
			}
			const { id: newUserId } = await addUser(newUser)
			await addPost({
				id: randUuid(),
				date: new Date().toISOString(),
				content: postContent,
				userId: newUserId
			})
		}
		router.refresh()
		setPostContent('')
		closeModal()
	}

	return (
		<form className="flex flex-col gap-4 w-3/4 h-1/2">
			<Textarea
				postContent={postContent}
				handleInputChange={handleInputChange}
				label={`What's on your mind?`}
			/>
			<Button label="Post It!" btnStyle="btn" onClick={handleAddPost} />
		</form>
	)
}

export default AddPostForm
